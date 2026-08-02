'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { createCommentator } from '../../data/handCricketCommentary';
import styles from './games.module.css';

const RATE_OPTIONS = [
  { label: 'Slow', value: 0.85 },
  { label: 'Normal', value: 1.05 },
  { label: 'Fast', value: 1.35 },
];

const RUN_WORDS = ['', 'One run', 'Two runs', 'Three runs', 'Four runs', 'Five runs', 'Six runs'];
const RUN_EVENTS = ['', 'run1', 'run2', 'run3', 'run4', 'run5', 'run6'];

function rand16() {
  return Math.floor(Math.random() * 6) + 1;
}

const HISTORY_KEY = 'handCricketHistory';

function loadHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list : [];
  } catch (e) {
    return [];
  }
}

function summarize(history) {
  const wins = history.filter((h) => h.outcome === 'win').length;
  const losses = history.filter((h) => h.outcome === 'lose').length;
  const ties = history.filter((h) => h.outcome === 'tie').length;
  const highest = history.reduce((max, h) => Math.max(max, h.userScore || 0), 0);
  return { wins, losses, ties, highest, played: history.length };
}

export default function HandCricket() {
  const [phase, setPhase] = useState('setup'); // setup | toss | choice | batting | result
  const [supported, setSupported] = useState(true);

  const [speechOn, setSpeechOn] = useState(true);
  const [rate, setRate] = useState(1.05);
  const [voices, setVoices] = useState([]);
  const [voiceURI, setVoiceURI] = useState('');

  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState({ wins: 0, losses: 0, ties: 0, highest: 0, played: 0 });

  // Match state
  const [battingFirst, setBattingFirst] = useState('user'); // 'user' | 'bot'
  const [currentBatter, setCurrentBatter] = useState('user');
  const [inning, setInning] = useState(1);
  const [userScore, setUserScore] = useState(0);
  const [botScore, setBotScore] = useState(0);
  const [target, setTarget] = useState(null);
  const [lastPlay, setLastPlay] = useState(null); // { userPick, botPick, out, runs }
  const [result, setResult] = useState(null);
  const [commentaryLine, setCommentaryLine] = useState('');
  const [message, setMessage] = useState('');

  const synthRef = useRef(null);
  const voiceURIRef = useRef('');
  const rateRef = useRef(1.05);
  const speechOnRef = useRef(true);
  const commentatorRef = useRef(null);
  const userPassedFiftyRef = useRef(false);
  const botPassedFiftyRef = useRef(false);
  const turnHeadingRef = useRef(null);
  const resultHeadingRef = useRef(null);

  useEffect(() => { voiceURIRef.current = voiceURI; }, [voiceURI]);
  useEffect(() => { rateRef.current = rate; }, [rate]);
  useEffect(() => { speechOnRef.current = speechOn; }, [speechOn]);

  if (!commentatorRef.current) commentatorRef.current = createCommentator();

  // Load speech, voices, preferences, and history.
  useEffect(() => {
    const h = loadHistory();
    setHistory(h);
    setStats(summarize(h));

    let savedVoice = '';
    let savedRate = null;
    let savedSpeech = null;
    try {
      savedVoice = localStorage.getItem('hcVoice') || '';
      savedRate = parseFloat(localStorage.getItem('hcRate'));
      savedSpeech = localStorage.getItem('hcSpeech');
    } catch (e) { /* ignore */ }
    if (savedRate && !Number.isNaN(savedRate)) setRate(savedRate);
    if (savedSpeech === 'off') setSpeechOn(false);

    const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    if (!synth) {
      setSupported(false);
      return undefined;
    }
    synthRef.current = synth;

    function loadVoices() {
      const all = synth.getVoices();
      const english = all.filter((v) => /^en/i.test(v.lang));
      const list = english.length ? english : all;
      setVoices(list);
      setVoiceURI((prev) => {
        if (prev) return prev;
        if (savedVoice && list.some((v) => v.voiceURI === savedVoice)) return savedVoice;
        const preferred = list.find((v) => /en[-_](gb|in|au)/i.test(v.lang)) ||
          list.find((v) => /en[-_]us/i.test(v.lang));
        return (preferred || list[0])?.voiceURI || '';
      });
    }
    loadVoices();
    synth.addEventListener('voiceschanged', loadVoices);
    return () => {
      synth.removeEventListener('voiceschanged', loadVoices);
      synth.cancel();
    };
  }, []);

  const speak = useCallback((text) => {
    const synth = synthRef.current;
    if (!synth || !speechOnRef.current || !text) return;
    synth.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    const chosen = synth.getVoices().find((v) => v.voiceURI === voiceURIRef.current);
    if (chosen) utter.voice = chosen;
    utter.rate = rateRef.current;
    synth.speak(utter);
  }, []);

  // announce: set the single visible live region and speak it. In the batting
  // phase the region is polite (updates are shown and read once); on phase
  // transitions (toss, choice, result) the region is role="alert" so the new
  // screen's message is reliably announced.
  const announce = useCallback((text) => {
    setMessage(text);
    speak(text);
  }, [speak]);

  useEffect(() => {
    if (phase === 'batting' && turnHeadingRef.current) turnHeadingRef.current.focus();
    if (phase === 'result' && resultHeadingRef.current) resultHeadingRef.current.focus();
  }, [phase, inning, currentBatter]);

  useEffect(() => () => { if (synthRef.current) synthRef.current.cancel(); }, []);

  function persist(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* ignore */ }
  }

  function resetMatchState() {
    setInning(1);
    setUserScore(0);
    setBotScore(0);
    setTarget(null);
    setLastPlay(null);
    setResult(null);
    userPassedFiftyRef.current = false;
    botPassedFiftyRef.current = false;
    commentatorRef.current = createCommentator();
  }

  function startMatch() {
    resetMatchState();
    persist('hcVoice', voiceURI);
    persist('hcRate', String(rate));
    persist('hcSpeech', speechOn ? 'on' : 'off');
    setPhase('toss');
    const c = commentatorRef.current;
    announce(`${c('matchStart')} Call the toss. Choose heads or tails.`);
  }

  function callToss(call) {
    const coin = Math.floor(Math.random() * 2); // 0 heads, 1 tails
    const c = commentatorRef.current;
    if (call === coin) {
      setPhase('choice');
      announce(`${c('tossWin')} Now choose to bat or to bowl.`);
    } else {
      // Bot won the toss and bats first.
      setBattingFirst('bot');
      setCurrentBatter('bot');
      setInning(1);
      setPhase('batting');
      announce(`${c('tossLose')} You are bowling first. ${c('bowlingStart')}`);
    }
  }

  function chooseRole(role) {
    const c = commentatorRef.current;
    if (role === 'bat') {
      setBattingFirst('user');
      setCurrentBatter('user');
      announce(`You chose to bat first. ${c('battingStart')}`);
    } else {
      setBattingFirst('bot');
      setCurrentBatter('bot');
      announce(`You chose to bowl first. ${c('bowlingStart')}`);
    }
    setInning(1);
    setPhase('batting');
  }

  function finishMatch(finalUser, finalBot) {
    const c = commentatorRef.current;
    const margin = Math.abs(finalUser - finalBot);
    const userChased = battingFirst === 'bot';
    let outcome;
    let sentence;
    if (finalUser > finalBot) {
      outcome = 'win';
      sentence = userChased
        ? 'You chased down the target. You win!'
        : `You defended your total and win by ${margin} ${margin === 1 ? 'run' : 'runs'}.`;
    } else if (finalUser < finalBot) {
      outcome = 'lose';
      sentence = userChased
        ? `You fell short by ${margin} ${margin === 1 ? 'run' : 'runs'}. You lose.`
        : 'The opponent chased down your total. You lose.';
    } else {
      outcome = 'tie';
      sentence = 'The scores are level. It is a tie!';
    }

    const record = { date: Date.now(), outcome, userScore: finalUser, botScore: finalBot };
    const nextHistory = [record, ...history].slice(0, 25);
    setHistory(nextHistory);
    setStats(summarize(nextHistory));
    persist(HISTORY_KEY, JSON.stringify(nextHistory));

    setResult({ outcome, sentence, userScore: finalUser, botScore: finalBot, margin });

    let line = c(outcome);
    if (outcome !== 'tie' && margin > 0 && margin <= 3) line = `${line} ${c('closeFinish')}`;
    setCommentaryLine(line);
    setPhase('result');
    announce(`Match over. Your total ${finalUser}, opponent ${finalBot}. ${sentence} ${line}`);
  }

  function handlePick(n) {
    if (phase !== 'batting') return;
    const c = commentatorRef.current;
    const batterIsUser = currentBatter === 'user';
    const userPick = n;
    const botPick = rand16();
    const out = userPick === botPick;

    let newUser = userScore;
    let newBot = botScore;
    let runs = 0;
    if (!out) {
      if (batterIsUser) { runs = userPick; newUser = userScore + userPick; }
      else { runs = botPick; newBot = botScore + botPick; }
    }
    setUserScore(newUser);
    setBotScore(newBot);
    setLastPlay({ userPick, botPick, out, runs, batterIsUser });

    // Milestone: fifty
    let fiftyLine = '';
    if (!out && batterIsUser && userScore < 50 && newUser >= 50 && !userPassedFiftyRef.current) {
      userPassedFiftyRef.current = true;
      fiftyLine = ` ${c('fifty')}`;
    }
    if (!out && !batterIsUser && botScore < 50 && newBot >= 50 && !botPassedFiftyRef.current) {
      botPassedFiftyRef.current = true;
      fiftyLine = ` ${c('fifty')}`;
    }

    if (inning === 1) {
      if (out) {
        const firstScore = batterIsUser ? newUser : newBot;
        const newTarget = firstScore + 1;
        setTarget(newTarget);
        setInning(2);
        setCurrentBatter(batterIsUser ? 'bot' : 'user');
        const outText = batterIsUser
          ? `Out! You are dismissed on ${newUser}.`
          : `Out! You bowled them out on ${newBot}.`;
        const nextRole = batterIsUser ? c('bowlingStart') : c('battingStart');
        setCommentaryLine(`${c('out')} ${c('inningsBreak')}`);
        announce(`${outText} The target is ${newTarget}. ${c('out')} ${c('inningsBreak')} ${nextRole}`);
      } else {
        const total = batterIsUser ? newUser : newBot;
        const totalText = batterIsUser ? `Your total is ${total}.` : `Opponent total is ${total}.`;
        const runLine = c(RUN_EVENTS[runs]);
        setCommentaryLine(runLine + fiftyLine);
        announce(`${RUN_WORDS[runs]}${batterIsUser ? '' : ' to the opponent'}. ${totalText} ${runLine}${fiftyLine}`);
      }
      return;
    }

    // Innings 2 (chase)
    const chasingScore = batterIsUser ? newUser : newBot;
    if (chasingScore >= target) {
      finishMatch(newUser, newBot);
      return;
    }
    if (out) {
      finishMatch(newUser, newBot);
      return;
    }
    const need = target - chasingScore;
    const totalText = batterIsUser ? `Your total is ${chasingScore}.` : `Opponent total is ${chasingScore}.`;
    const runLine = c(RUN_EVENTS[runs]);
    let pressure = '';
    if (need <= 6) pressure = ` ${c('chasePressure')}`;
    setCommentaryLine(runLine + fiftyLine);
    announce(
      `${RUN_WORDS[runs]}${batterIsUser ? '' : ' to the opponent'}. ${totalText} Need ${need} more to win.${pressure} ${runLine}${fiftyLine}`
    );
  }

  // Global number-key input during batting (keyboard + numpad), no navigation needed.
  useEffect(() => {
    if (phase !== 'batting') return undefined;
    function onKey(e) {
      const tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (e.key >= '1' && e.key <= '6') {
        e.preventDefault();
        handlePick(parseInt(e.key, 10));
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const turnInstruction = currentBatter === 'user'
    ? 'You are batting. Play a number from one to six to take your shot.'
    : 'You are bowling. Play a number from one to six to bowl your delivery.';

  // ---------- SETUP ----------
  if (phase === 'setup') {
    return (
      <div className={styles.game}>
        <p className={styles.instructions}>
          Hand cricket, made for playing by ear. Win the toss, choose to bat or bowl, then on every
          ball you and the bot each pick a number from one to six. If your numbers match, the batter
          is out. Otherwise the batter scores their number. A rich commentary track calls the action
          aloud. First to defend or chase down the target wins.
        </p>
        <p className={styles.recommend}>
          <strong>For the best experience</strong>, either keep app commentary on and temporarily
          pause your screen reader, or turn app commentary off and let your screen reader read the
          match updates. In NVDA press the NVDA key plus S; in JAWS press Insert plus Space, then S.
          You can play entirely with the number keys one to six.
        </p>

        {!supported && (
          <p className={`${styles.status} ${styles.statusError}`} role="alert">
            Your browser does not support speech synthesis, so commentary cannot be spoken aloud.
            All match updates still appear as text and are announced to screen readers.
          </p>
        )}

        <div className={styles.panel}>
          <h2 className={styles.blockHeadingTop}>Your record</h2>
          <dl className={styles.metrics}>
            <div className={styles.metricRow}><dt>Matches played</dt><dd>{stats.played}</dd></div>
            <div className={styles.metricRow}><dt>Wins</dt><dd>{stats.wins}</dd></div>
            <div className={styles.metricRow}><dt>Losses</dt><dd>{stats.losses}</dd></div>
            <div className={styles.metricRow}><dt>Ties</dt><dd>{stats.ties}</dd></div>
            <div className={styles.metricRow}><dt>Highest score</dt><dd>{stats.highest}</dd></div>
          </dl>

          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Commentary settings</legend>
            <label className={styles.option} style={{ marginBottom: '0.75rem' }}>
              <input
                type="checkbox"
                checked={speechOn}
                onChange={(e) => setSpeechOn(e.target.checked)}
              />
              <span>Speak commentary aloud</span>
            </label>

            {supported && voices.length > 0 && (
              <div className={styles.settingsRow} style={{ borderTop: 'none', paddingTop: 0, marginTop: 0 }}>
                <div className={styles.field}>
                  <label htmlFor="hc-voice">Commentary voice</label>
                  <select id="hc-voice" className={styles.input} value={voiceURI}
                    onChange={(e) => setVoiceURI(e.target.value)} disabled={!speechOn}>
                    {voices.map((v) => (
                      <option key={v.voiceURI} value={v.voiceURI}>{v.name} ({v.lang})</option>
                    ))}
                  </select>
                </div>
                <div className={styles.field}>
                  <label htmlFor="hc-rate">Speaking speed</label>
                  <select id="hc-rate" className={styles.input} value={rate}
                    onChange={(e) => setRate(parseFloat(e.target.value))} disabled={!speechOn}>
                    {RATE_OPTIONS.map((r) => (<option key={r.value} value={r.value}>{r.label}</option>))}
                  </select>
                </div>
              </div>
            )}
          </fieldset>

          <div style={{ marginTop: '1.25rem' }}>
            <button type="button" className="btn btn-primary" onClick={startMatch}>
              Start match
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---------- TOSS ----------
  if (phase === 'toss') {
    return (
      <div className={styles.game}>
        <p className={styles.politeLive} role="alert">{message}</p>
        <div className={styles.panel}>
          <h2 className={styles.blockHeadingTop}>The toss</h2>
          <p>Call the coin. Choose heads or tails.</p>
          <div className={styles.controls}>
            <button type="button" className="btn btn-primary" onClick={() => callToss(0)}>Heads</button>
            <button type="button" className="btn btn-primary" onClick={() => callToss(1)}>Tails</button>
          </div>
        </div>
      </div>
    );
  }

  // ---------- CHOICE ----------
  if (phase === 'choice') {
    return (
      <div className={styles.game}>
        <p className={styles.politeLive} role="alert">{message}</p>
        <div className={styles.panel}>
          <h2 className={styles.blockHeadingTop}>You won the toss</h2>
          <p>Will you bat or bowl first?</p>
          <div className={styles.controls}>
            <button type="button" className="btn btn-primary" onClick={() => chooseRole('bat')}>Bat first</button>
            <button type="button" className="btn btn-primary" onClick={() => chooseRole('bowl')}>Bowl first</button>
          </div>
        </div>
      </div>
    );
  }

  // ---------- BATTING ----------
  if (phase === 'batting') {
    return (
      <div className={styles.game}>
        <p className={styles.politeLive} role="status" aria-live="polite">{message}</p>

        <div className={styles.panel}>
          <div className={styles.scoreboard}>
            <div><span className={styles.scoreLabel}>Innings</span><span className={styles.scoreValue}>{inning} of 2</span></div>
            <div><span className={styles.scoreLabel}>Your score</span><span className={styles.scoreValue}>{userScore}</span></div>
            <div><span className={styles.scoreLabel}>Opponent</span><span className={styles.scoreValue}>{botScore}</span></div>
            {target !== null && (
              <div><span className={styles.scoreLabel}>Target</span><span className={styles.scoreValue}>{target}</span></div>
            )}
          </div>

          <h2 className={styles.turnHeading} tabIndex={-1} ref={turnHeadingRef}>{turnInstruction}</h2>

          {commentaryLine && <p className={styles.commentary}>{commentaryLine}</p>}

          <div className={styles.numpad} role="group" aria-label="Play a number from one to six">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <button
                key={n}
                type="button"
                className={styles.numButton}
                onClick={() => handlePick(n)}
                aria-label={`Play ${n}`}
              >
                {n}
              </button>
            ))}
          </div>
          <p className={styles.meta}>Tip: press the number keys 1 to 6 to play without the mouse.</p>
        </div>
      </div>
    );
  }

  // ---------- RESULT ----------
  return (
    <div className={styles.game}>
      <p className={styles.politeLive} role="alert">{message}</p>
      <div className={styles.panel}>
        <h2 className={styles.blockHeadingTop} tabIndex={-1} ref={resultHeadingRef}>Match result</h2>
        <p className={styles.scoreBig}>{result.sentence}</p>
        <p className={styles.commentary}>{commentaryLine}</p>
        <dl className={styles.metrics}>
          <div className={styles.metricRow}><dt>Your total</dt><dd>{result.userScore}</dd></div>
          <div className={styles.metricRow}><dt>Opponent total</dt><dd>{result.botScore}</dd></div>
          <div className={styles.metricRow}><dt>Record</dt><dd>{stats.wins} won, {stats.losses} lost, {stats.ties} tied</dd></div>
        </dl>
        <div className={styles.controls}>
          <button type="button" className="btn btn-primary" onClick={startMatch}>Play again</button>
          <button type="button" className="btn btn-outline" onClick={() => { if (synthRef.current) synthRef.current.cancel(); setPhase('setup'); setMessage(''); }}>
            Back to menu
          </button>
        </div>
      </div>
    </div>
  );
}
