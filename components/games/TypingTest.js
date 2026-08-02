'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { typingLevels, buildQueue } from '../../data/typingContent';
import styles from './games.module.css';

const RATE_OPTIONS = [
  { label: 'Slow', value: 0.8 },
  { label: 'Normal', value: 1 },
  { label: 'Fast', value: 1.4 },
];

function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]|_/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function scoreRecords(records, elapsedSeconds) {
  let typedChars = 0;
  let correctChars = 0;
  let correctItems = 0;

  records.forEach(({ expected, typed }) => {
    const e = normalize(expected);
    const t = normalize(typed);
    typedChars += t.length;
    const len = Math.min(e.length, t.length);
    for (let i = 0; i < len; i++) {
      if (e[i] === t[i]) correctChars += 1;
    }
    if (e === t && e.length > 0) correctItems += 1;
  });

  const minutes = Math.max(elapsedSeconds, 1) / 60;
  const grossWpm = Math.round(typedChars / 5 / minutes);
  const netWpm = Math.round(correctChars / 5 / minutes);
  const accuracy = typedChars > 0 ? Math.round((correctChars / typedChars) * 100) : 0;

  return {
    grossWpm,
    netWpm,
    accuracy,
    itemsCompleted: records.length,
    correctItems,
    typedChars,
  };
}

export default function TypingTest() {
  const [phase, setPhase] = useState('setup'); // setup | running | finished
  const [supported, setSupported] = useState(true);
  const [levelId, setLevelId] = useState('easy');
  const [voices, setVoices] = useState([]);
  const [voiceURI, setVoiceURI] = useState('');
  const [rate, setRate] = useState(1);

  const [currentPrompt, setCurrentPrompt] = useState('');
  const [typed, setTyped] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [politeMsg, setPoliteMsg] = useState('');
  const [assertiveMsg, setAssertiveMsg] = useState('');
  const [results, setResults] = useState(null);
  const [personalBest, setPersonalBest] = useState(null);
  const [isNewBest, setIsNewBest] = useState(false);

  const synthRef = useRef(null);
  const queueRef = useRef([]);
  const indexRef = useRef(0);
  const promptRef = useRef('');
  const recordsRef = useRef([]);
  const startTimeRef = useRef(0);
  const voiceURIRef = useRef('');
  const rateRef = useRef(1);
  const inputRef = useRef(null);
  const resultsHeadingRef = useRef(null);

  // Keep refs in sync so speech uses the latest settings inside timers.
  useEffect(() => { voiceURIRef.current = voiceURI; }, [voiceURI]);
  useEffect(() => { rateRef.current = rate; }, [rate]);

  // Load available voices and saved preferences.
  useEffect(() => {
    const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    if (!synth) {
      setSupported(false);
      return undefined;
    }
    synthRef.current = synth;

    let savedVoice = '';
    let savedRate = null;
    let savedLevel = '';
    try {
      savedVoice = localStorage.getItem('typingVoice') || '';
      savedRate = parseFloat(localStorage.getItem('typingRate'));
      savedLevel = localStorage.getItem('typingLevel') || '';
    } catch (e) { /* ignore */ }
    if (savedRate && !Number.isNaN(savedRate)) setRate(savedRate);
    if (savedLevel && typingLevels[savedLevel]) setLevelId(savedLevel);

    function loadVoices() {
      const all = synth.getVoices();
      const english = all.filter((v) => /^en/i.test(v.lang));
      const list = english.length ? english : all;
      setVoices(list);
      setVoiceURI((prev) => {
        if (prev) return prev;
        if (savedVoice && list.some((v) => v.voiceURI === savedVoice)) return savedVoice;
        const preferred = list.find((v) => v.localService && /en[-_]us/i.test(v.lang));
        return (preferred || list[0])?.voiceURI || '';
      });
    }
    loadVoices();
    synth.addEventListener('voiceschanged', loadVoices);
    return () => synth.removeEventListener('voiceschanged', loadVoices);
  }, []);

  const speak = useCallback((text) => {
    const synth = synthRef.current;
    if (!synth || !text) return;
    synth.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    const chosen = synth.getVoices().find((v) => v.voiceURI === voiceURIRef.current);
    if (chosen) utter.voice = chosen;
    utter.rate = rateRef.current;
    synth.speak(utter);
  }, []);

  const finishTest = useCallback(() => {
    if (synthRef.current) synthRef.current.cancel();
    const level = promptRef.currentLevel;
    const seconds = Math.min(
      (Date.now() - startTimeRef.current) / 1000,
      typingLevels[level].durationSeconds
    );
    const metrics = scoreRecords(recordsRef.current, seconds);
    setResults(metrics);

    let best = null;
    let newBest = false;
    try {
      const key = `typingBest_${level}`;
      const prev = parseInt(localStorage.getItem(key), 10);
      best = Number.isNaN(prev) ? null : prev;
      if (best === null || metrics.netWpm > best) {
        localStorage.setItem(key, String(metrics.netWpm));
        best = metrics.netWpm;
        newBest = metrics.itemsCompleted > 0;
      }
    } catch (e) { /* ignore */ }
    setPersonalBest(best);
    setIsNewBest(newBest);

    setPhase('finished');
    setPoliteMsg('');
    setAssertiveMsg(
      `Time is up. Your net speed was ${metrics.netWpm} words per minute with ${metrics.accuracy} percent accuracy.`
    );
  }, []);

  // Countdown timer.
  useEffect(() => {
    if (phase !== 'running') return undefined;
    const id = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 1;
        if (next === 30) setPoliteMsg('Thirty seconds remaining.');
        else if (next === 10) setPoliteMsg('Ten seconds remaining.');
        if (next <= 0) {
          clearInterval(id);
          finishTest();
          return 0;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [phase, finishTest]);

  // Focus management and cleanup.
  useEffect(() => {
    if (phase === 'running' && inputRef.current) inputRef.current.focus();
    if (phase === 'finished' && resultsHeadingRef.current) resultsHeadingRef.current.focus();
  }, [phase]);

  useEffect(() => () => { if (synthRef.current) synthRef.current.cancel(); }, []);

  function persist(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* ignore */ }
  }

  function startTest() {
    const level = typingLevels[levelId];
    const queue = buildQueue(levelId);
    queueRef.current = queue;
    indexRef.current = 0;
    recordsRef.current = [];
    promptRef.current = queue[0];
    promptRef.currentLevel = levelId;
    startTimeRef.current = Date.now();

    persist('typingLevel', levelId);
    persist('typingVoice', voiceURI);
    persist('typingRate', String(rate));

    setCurrentPrompt(queue[0]);
    setTyped('');
    setResults(null);
    setIsNewBest(false);
    setTimeLeft(level.durationSeconds);
    setAssertiveMsg('');
    setPoliteMsg('Test started. Listen and type. Press Enter after each item. Press Control plus Space to repeat.');
    setPhase('running');
    // Speak the first prompt shortly after the UI updates.
    setTimeout(() => speak(queue[0]), 350);
  }

  function submitCurrent() {
    recordsRef.current.push({ expected: promptRef.current, typed });
    indexRef.current += 1;
    const next = queueRef.current[indexRef.current];
    promptRef.current = next;
    setCurrentPrompt(next);
    setTyped('');
    speak(next);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (typed.trim().length > 0) submitCurrent();
    } else if (event.ctrlKey && (event.code === 'Space' || event.key === ' ')) {
      event.preventDefault();
      speak(promptRef.current);
      setPoliteMsg('Repeating the current item.');
    }
  }

  function backToSetup() {
    if (synthRef.current) synthRef.current.cancel();
    setPhase('setup');
    setAssertiveMsg('');
    setPoliteMsg('');
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeDisplay = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  // ---- SETUP ----
  if (phase === 'setup') {
    return (
      <div className={styles.game}>
        <p className={styles.instructions}>
          This is a dictation typing test. The app reads a word or sentence aloud, you type
          what you hear, and press Enter to move on. Make sure your sound is on. Choose a level
          and your voice settings, then start.
        </p>

        {!supported && (
          <p className={`${styles.status} ${styles.statusError}`} role="alert">
            Your browser does not support speech synthesis, so the prompts cannot be read aloud.
            You can still see each prompt on screen and type it, or try a modern browser such as
            Chrome, Edge, or Safari.
          </p>
        )}

        <div className={styles.panel}>
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Choose a level</legend>
            {Object.values(typingLevels).map((level) => (
              <label key={level.id} className={`${styles.option} ${levelId === level.id ? styles.optionSelected : ''}`}>
                <input
                  type="radio"
                  name="typing-level"
                  value={level.id}
                  checked={levelId === level.id}
                  onChange={() => setLevelId(level.id)}
                />
                <span>
                  <strong>{level.label}</strong> &mdash; {level.description}
                </span>
              </label>
            ))}
          </fieldset>

          {supported && voices.length > 0 && (
            <div className={styles.settingsRow}>
              <div className={styles.field}>
                <label htmlFor="voice-select">Dictation voice</label>
                <select
                  id="voice-select"
                  className={styles.input}
                  value={voiceURI}
                  onChange={(e) => setVoiceURI(e.target.value)}
                >
                  {voices.map((v) => (
                    <option key={v.voiceURI} value={v.voiceURI}>
                      {v.name} ({v.lang})
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.field}>
                <label htmlFor="rate-select">Speaking speed</label>
                <select
                  id="rate-select"
                  className={styles.input}
                  value={rate}
                  onChange={(e) => setRate(parseFloat(e.target.value))}
                >
                  {RATE_OPTIONS.map((r) => (
                    <option key={r.value} value={r.value}>{r.label}</option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                className="btn btn-outline"
                onClick={() => speak('This is how the dictation voice will sound.')}
              >
                Test voice
              </button>
            </div>
          )}

          <div style={{ marginTop: '1.25rem' }}>
            <button type="button" className="btn btn-primary" onClick={startTest}>
              Start test
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---- RUNNING ----
  if (phase === 'running') {
    return (
      <div className={styles.game}>
        <p className={styles.politeLive} role="status" aria-live="polite">{politeMsg}</p>

        <div className={styles.panel}>
          <div className={styles.timerRow}>
            <span className={styles.timer} aria-hidden="true">{timeDisplay}</span>
            <span className={styles.meta}>{typingLevels[levelId].label} level</span>
          </div>

          <p className={styles.meta} id="prompt-label">Current item to type:</p>
          <p className={styles.target} aria-hidden="true">{currentPrompt}</p>

          <div className={styles.field}>
            <label htmlFor="typing-input">Type what you hear, then press Enter</label>
            <textarea
              id="typing-input"
              ref={inputRef}
              className={styles.textarea}
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={2}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              aria-describedby="typing-help"
            />
            <p id="typing-help" className={styles.meta}>
              Press Enter to submit and hear the next item. Press Control plus Space to repeat the
              current item.
            </p>
          </div>

          <div className={styles.controls}>
            <button type="button" className="btn btn-outline" onClick={() => { speak(promptRef.current); setPoliteMsg('Repeating the current item.'); }}>
              Repeat item
            </button>
            <button type="button" className="btn btn-primary" onClick={finishTest}>
              Finish now
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---- FINISHED ----
  return (
    <div className={styles.game}>
      <p className={styles.politeLive} role="alert">{assertiveMsg}</p>

      <div className={styles.panel}>
        <h2 tabIndex={-1} ref={resultsHeadingRef} className={styles.blockHeadingTop}>
          Your results
        </h2>

        {isNewBest && (
          <p className={styles.scoreBig}>New personal best!</p>
        )}

        <dl className={styles.metrics}>
          <div className={styles.metricRow}>
            <dt>Net speed</dt>
            <dd><strong>{results.netWpm}</strong> words per minute</dd>
          </div>
          <div className={styles.metricRow}>
            <dt>Gross speed</dt>
            <dd>{results.grossWpm} words per minute</dd>
          </div>
          <div className={styles.metricRow}>
            <dt>Accuracy</dt>
            <dd>{results.accuracy}%</dd>
          </div>
          <div className={styles.metricRow}>
            <dt>Items completed</dt>
            <dd>{results.itemsCompleted} ({results.correctItems} fully correct)</dd>
          </div>
          <div className={styles.metricRow}>
            <dt>Characters typed</dt>
            <dd>{results.typedChars}</dd>
          </div>
          {personalBest !== null && (
            <div className={styles.metricRow}>
              <dt>Personal best ({typingLevels[levelId].label})</dt>
              <dd>{personalBest} words per minute</dd>
            </div>
          )}
        </dl>

        {recordsRef.current.some((r) => normalize(r.expected) !== normalize(r.typed)) && (
          <details className={styles.review}>
            <summary>Review the items you missed</summary>
            <ul className={styles.reviewList}>
              {recordsRef.current
                .filter((r) => normalize(r.expected) !== normalize(r.typed))
                .map((r, i) => (
                  <li key={i}>
                    Expected: <strong>{r.expected}</strong>. You typed:{' '}
                    <em>{r.typed || '(nothing)'}</em>.
                  </li>
                ))}
            </ul>
          </details>
        )}

        <div className={styles.controls}>
          <button type="button" className="btn btn-primary" onClick={startTest}>
            Try again ({typingLevels[levelId].label})
          </button>
          <button type="button" className="btn btn-outline" onClick={backToSetup}>
            Choose another level
          </button>
        </div>
      </div>
    </div>
  );
}
