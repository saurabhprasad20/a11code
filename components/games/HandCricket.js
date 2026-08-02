'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { createCommentator, strings } from '../../data/handCricketCommentary';
import sounds from './cricketSounds';
import styles from './games.module.css';

const RATE_OPTIONS = [
  { label: 'Slow', value: 0.85 },
  { label: 'Normal', value: 1.05 },
  { label: 'Fast', value: 1.35 },
];

const RUN_EVENTS = ['', 'run1', 'run2', 'run3', 'run4', 'run5', 'run6'];

function rand16() {
  return Math.floor(Math.random() * 6) + 1;
}

function voiceMatchesLang(v, lang) {
  return lang === 'hi' ? /^hi/i.test(v.lang) : /^en/i.test(v.lang);
}

function pickVoiceForLang(list, lang) {
  if (!list || list.length === 0) return null;
  const matches = list.filter((v) => voiceMatchesLang(v, lang));
  const pool = matches.length ? matches : list;
  if (lang === 'hi') return pool.find((v) => /hi[-_]in/i.test(v.lang)) || pool[0];
  return (
    pool.find((v) => /en[-_](us|gb|in|au)/i.test(v.lang)) || pool[0]
  );
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
  const [lang, setLang] = useState('en');
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

  const S = strings[lang] || strings.en;

  useEffect(() => { voiceURIRef.current = voiceURI; }, [voiceURI]);
  useEffect(() => { rateRef.current = rate; }, [rate]);
  useEffect(() => { speechOnRef.current = speechOn; }, [speechOn]);

  if (!commentatorRef.current) commentatorRef.current = createCommentator(lang);

  // Load speech, voices, preferences, and history.
  useEffect(() => {
    const h = loadHistory();
    setHistory(h);
    setStats(summarize(h));

    let savedVoice = '';
    let savedRate = null;
    let savedSpeech = null;
    let savedLang = 'en';
    try {
      savedVoice = localStorage.getItem('hcVoice') || '';
      savedRate = parseFloat(localStorage.getItem('hcRate'));
      savedSpeech = localStorage.getItem('hcSpeech');
      const l = localStorage.getItem('hcLang');
      if (l === 'hi' || l === 'en') savedLang = l;
    } catch (e) { /* ignore */ }
    if (savedRate && !Number.isNaN(savedRate)) setRate(savedRate);
    if (savedSpeech === 'off') setSpeechOn(false);
    setLang(savedLang);

    const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    if (!synth) {
      setSupported(false);
      return undefined;
    }
    synthRef.current = synth;

    function loadVoices() {
      const all = synth.getVoices();
      if (!all.length) return;
      setVoices(all);
      setVoiceURI((prev) => {
        if (prev) return prev;
        if (savedVoice && all.some((v) => v.voiceURI === savedVoice)) return savedVoice;
        return pickVoiceForLang(all, savedLang)?.voiceURI || '';
      });
    }
    loadVoices();
    synth.addEventListener('voiceschanged', loadVoices);
    return () => {
      synth.removeEventListener('voiceschanged', loadVoices);
      synth.cancel();
    };
  }, []);

  // When the language changes, switch to a matching default voice if the
  // current one does not fit the new language.
  const langInitRef = useRef(true);
  useEffect(() => {
    if (langInitRef.current) { langInitRef.current = false; return; }
    if (!voices.length) return;
    const current = voices.find((v) => v.voiceURI === voiceURI);
    if (!current || !voiceMatchesLang(current, lang)) {
      const next = pickVoiceForLang(voices, lang);
      if (next) setVoiceURI(next.voiceURI);
    }
  }, [lang, voices]); // eslint-disable-line react-hooks/exhaustive-deps

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

  // Sound effects share the commentary switch: if commentary is off, so are the
  // sounds. There is intentionally no separate control. Each helper no-ops when
  // Web Audio is unavailable.
  const sfx = useCallback((name, ...args) => {
    if (!speechOnRef.current) return;
    const fn = sounds[name];
    if (fn) fn(...args);
  }, []);

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
    commentatorRef.current = createCommentator(lang);
  }

  function startMatch() {
    resetMatchState();
    persist('hcVoice', voiceURI);
    persist('hcRate', String(rate));
    persist('hcSpeech', speechOn ? 'on' : 'off');
    persist('hcLang', lang);
    setPhase('toss');
    const c = commentatorRef.current;
    const opener = `${c('matchStart')} ${S.tossTime}`;
    // A welcome fanfare opens the match, then the commentary begins.
    if (speechOnRef.current) {
      sounds.unlock();
      sounds.welcome();
      window.setTimeout(() => announce(opener), 1150);
    } else {
      announce(opener);
    }
  }

  function backToMenu() {
    if (synthRef.current) synthRef.current.cancel();
    setPhase('setup');
    setMessage('');
  }

  function callToss(call) {
    const coin = Math.floor(Math.random() * 2); // 0 heads, 1 tails
    const c = commentatorRef.current;
    sfx('coin');
    if (call === coin) {
      setPhase('choice');
      announce(`${c('tossWin')} ${S.chooseBatBowl}`);
    } else {
      // Bot won the toss and bats first.
      setBattingFirst('bot');
      setCurrentBatter('bot');
      setInning(1);
      setPhase('batting');
      announce(`${c('tossLose')} ${S.bowlFirst} ${c('bowlingStart')} ${S.firstBall}`);
    }
  }

  function chooseRole(role) {
    const c = commentatorRef.current;
    if (role === 'bat') {
      setBattingFirst('user');
      setCurrentBatter('user');
      announce(`${S.choseBat} ${c('battingStart')} ${S.firstBall}`);
    } else {
      setBattingFirst('bot');
      setCurrentBatter('bot');
      announce(`${S.choseBowl} ${c('bowlingStart')} ${S.firstBall}`);
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
      sentence = userChased ? S.winChase : S.winDefend(margin);
    } else if (finalUser < finalBot) {
      outcome = 'lose';
      sentence = userChased ? S.loseChase(margin) : S.loseDefend;
    } else {
      outcome = 'tie';
      sentence = S.tieResult;
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
    sfx(outcome); // win / lose / tie closing sound
    announce(`${S.matchOverPrefix(finalUser, finalBot)} ${sentence} ${line} ${S.playAgainPrompt}`);
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

    // Ball sound: the shot for runs (with a crowd roar on a boundary), or the
    // clatter of stumps for a wicket. A terminal wicket in the chase is left to
    // the closing stinger in finishMatch so the sounds do not collide.
    if (!out) {
      sfx('runTap', runs);
      if (runs >= 4) sfx('boundary', runs);
    }

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
    if (fiftyLine) sfx('fifty');

    if (inning === 1) {
      if (out) {
        sfx('wicket');
        const firstScore = batterIsUser ? newUser : newBot;
        const newTarget = firstScore + 1;
        setTarget(newTarget);
        setInning(2);
        setCurrentBatter(batterIsUser ? 'bot' : 'user');
        const outText = batterIsUser ? S.outDismissed(newUser) : S.outBowled(newBot);
        const nextRole = batterIsUser ? c('bowlingStart') : c('battingStart');
        setCommentaryLine(`${c('out')} ${c('inningsBreak')}`);
        announce(`${outText} ${S.targetIs(newTarget)} ${c('out')} ${c('inningsBreak')} ${nextRole} ${S.firstBall}`);
      } else {
        const runLine = c(RUN_EVENTS[runs]);
        setCommentaryLine(runLine + fiftyLine);
        announce(`${runLine}${fiftyLine} ${S.nextBall}`);
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
    const runLine = c(RUN_EVENTS[runs]);
    let pressure = '';
    if (need <= 6) { pressure = ` ${c('chasePressure')}`; sfx('pressure'); }
    setCommentaryLine(runLine + fiftyLine);
    announce(`${runLine}${fiftyLine}${pressure} ${S.nextBall}`);
  }

  function reportScore() {
    announce(S.scoreReport({ userScore, botScore, target, currentBatter }));
  }

  // Global number-key input during batting (keyboard + numpad), no navigation needed.
  // Keyboard commands per phase. Ignored while a form control is focused.
  useEffect(() => {
    function onKey(e) {
      const tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key.toLowerCase();
      if (phase === 'batting') {
        if (e.key >= '1' && e.key <= '6') { e.preventDefault(); handlePick(parseInt(e.key, 10)); }
        else if (k === 'm') { e.preventDefault(); reportScore(); }
      } else if (phase === 'toss') {
        if (k === 'h') { e.preventDefault(); callToss(0); }
        else if (k === 't') { e.preventDefault(); callToss(1); }
      } else if (phase === 'choice') {
        if (k === 'b') { e.preventDefault(); chooseRole('bat'); }
        else if (k === 'l') { e.preventDefault(); chooseRole('bowl'); }
      } else if (phase === 'result') {
        if (k === 's') { e.preventDefault(); startMatch(); }
        else if (k === 'q') { e.preventDefault(); backToMenu(); }
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const turnInstruction = currentBatter === 'user' ? S.battingTurn : S.bowlingTurn;

  // Voices shown in the dropdown match the chosen language (fall back to all).
  const langVoices = voices.filter((v) => voiceMatchesLang(v, lang));
  const displayVoices = langVoices.length ? langVoices : voices;
  const hasHindiVoice = voices.some((v) => /^hi/i.test(v.lang));

  // ---------- SETUP ----------
  if (phase === 'setup') {
    return (
      <div className={styles.game}>
        <p className={styles.instructions}>
          Hand cricket, made for playing by ear. Win the toss, choose to bat or bowl, then on every
          ball you and the bot each pick a number from one to six. If your numbers match, the batter
          is out. Otherwise the batter scores their number. A rich commentary track, woven with
          live crowd sound, bat-on-ball taps and stumps rattling, calls the action aloud. First to
          defend or chase down the target wins.
        </p>
        <p className={styles.recommend}>
          <strong>For the best experience</strong>, keep the commentary on and switch your screen
          reader to focus mode, or pause its speech, then simply follow the spoken commands. In NVDA
          press the NVDA key plus S to pause speech; in JAWS press Insert plus Space, then S. You can
          play entirely from the keyboard: <strong>H</strong> for heads, <strong>T</strong> for
          tails, <strong>B</strong> to bat, <strong>L</strong> to bowl, the number keys{' '}
          <strong>1 to 6</strong> to play each ball, <strong>M</strong> any time to hear the score,
          and after the match <strong>S</strong> to start again or <strong>Q</strong> to return to
          the menu.
        </p>
        <p className={styles.meta}>
          Commentary is available in <strong>English</strong> and <strong>Hindi</strong>. Choose
          your language below; Hindi commentary sounds best with a Hindi system voice installed.
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
            <legend className={styles.legend}>Commentary language</legend>
            <div className={styles.controls} style={{ marginTop: 0 }}>
              <label className={`${styles.option} ${lang === 'en' ? styles.optionSelected : ''}`}>
                <input type="radio" name="hc-lang" value="en" checked={lang === 'en'}
                  onChange={() => setLang('en')} />
                <span>English</span>
              </label>
              <label className={`${styles.option} ${lang === 'hi' ? styles.optionSelected : ''}`}>
                <input type="radio" name="hc-lang" value="hi" checked={lang === 'hi'}
                  onChange={() => setLang('hi')} />
                <span>{'\u0939\u093F\u0928\u094D\u0926\u0940'} (Hindi)</span>
              </label>
            </div>
          </fieldset>

          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Commentary settings</legend>
            <label className={styles.option} style={{ marginBottom: '0.75rem' }}>
              <input
                type="checkbox"
                checked={speechOn}
                onChange={(e) => setSpeechOn(e.target.checked)}
              />
              <span>Speak commentary and sound effects</span>
            </label>

            {supported && voices.length > 0 && (
              <div className={styles.settingsRow} style={{ borderTop: 'none', paddingTop: 0, marginTop: 0 }}>
                <div className={styles.field}>
                  <label htmlFor="hc-voice">Commentary voice</label>
                  <select id="hc-voice" className={styles.input} value={voiceURI}
                    onChange={(e) => setVoiceURI(e.target.value)} disabled={!speechOn}>
                    {displayVoices.map((v) => (
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
            {supported && speechOn && lang === 'hi' && !hasHindiVoice && (
              <p className={styles.meta} style={{ marginTop: '0.75rem' }}>
                No Hindi voice was found on your device, so an English voice may not pronounce the
                Hindi commentary well. You can still read every line on screen, or install a Hindi
                voice in your system settings for spoken commentary.
              </p>
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
          <p>Call the coin. Press <strong>H</strong> for heads or <strong>T</strong> for tails, or use the buttons below.</p>
          <div className={styles.controls}>
            <button type="button" className="btn btn-primary" onClick={() => callToss(0)}>Heads (H)</button>
            <button type="button" className="btn btn-primary" onClick={() => callToss(1)}>Tails (T)</button>
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
          <p>Will you bat or bowl first? Press <strong>B</strong> to bat or <strong>L</strong> to bowl.</p>
          <div className={styles.controls}>
            <button type="button" className="btn btn-primary" onClick={() => chooseRole('bat')}>Bat first (B)</button>
            <button type="button" className="btn btn-primary" onClick={() => chooseRole('bowl')}>Bowl first (L)</button>
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
            <div><span className={styles.scoreLabel}>{S.labelInnings}</span><span className={styles.scoreValue}>{inning} / 2</span></div>
            <div><span className={styles.scoreLabel}>{S.labelYourScore}</span><span className={styles.scoreValue}>{userScore}</span></div>
            <div><span className={styles.scoreLabel}>{S.labelOpponent}</span><span className={styles.scoreValue}>{botScore}</span></div>
            {target !== null && (
              <div><span className={styles.scoreLabel}>{S.labelTarget}</span><span className={styles.scoreValue}>{target}</span></div>
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
          <div className={styles.controls}>
            <button type="button" className="btn btn-outline" onClick={reportScore}>
              Scoreboard (M)
            </button>
          </div>
          <p className={styles.meta}>{S.tipKeys}</p>
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
        <p className={styles.meta}>Press <strong>S</strong> to play again, or <strong>Q</strong> to return to the menu.</p>
        <div className={styles.controls}>
          <button type="button" className="btn btn-primary" onClick={startMatch}>Play again (S)</button>
          <button type="button" className="btn btn-outline" onClick={backToMenu}>
            Back to menu (Q)
          </button>
        </div>
      </div>
    </div>
  );
}
