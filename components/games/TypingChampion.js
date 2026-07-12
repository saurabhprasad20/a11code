'use client';

import { useState, useRef } from 'react';
import styles from './games.module.css';

const PASSAGES = [
  'Accessible code is code that everyone can read and run.',
  'A screen reader announces each error so you can fix it quickly.',
  'Practice a little every day and your speed will grow steadily.',
  'The terminal is a powerful and fully keyboard driven tool.',
  'Clear names make programs easier to understand and maintain.',
];

function pickPassage(exclude) {
  const options = PASSAGES.filter((p) => p !== exclude);
  return options[Math.floor(Math.random() * options.length)];
}

export default function TypingChampion() {
  const [passage, setPassage] = useState(() => PASSAGES[0]);
  const [typed, setTyped] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState('Start typing the passage below to begin the timer.');
  const inputRef = useRef(null);

  function handleChange(event) {
    const value = event.target.value;
    if (startTime === null && value.length > 0) {
      setStartTime(Date.now());
      setStatus('Timer started. Keep typing.');
    }
    setTyped(value);
  }

  function handleFinish() {
    if (!startTime || typed.length === 0) {
      setStatus('Type the passage first, then select Finish.');
      return;
    }
    const minutes = (Date.now() - startTime) / 60000;
    const wordsTyped = typed.trim().split(/\s+/).length;
    const wpm = Math.max(0, Math.round(wordsTyped / minutes));

    let correct = 0;
    for (let i = 0; i < typed.length; i++) {
      if (typed[i] === passage[i]) correct++;
    }
    const accuracy = Math.round((correct / passage.length) * 100);

    setResult({ wpm, accuracy });
    setStatus(
      `Finished. Your speed was ${wpm} words per minute with ${accuracy} percent accuracy.`
    );
  }

  function handleNext() {
    const next = pickPassage(passage);
    setPassage(next);
    setTyped('');
    setStartTime(null);
    setResult(null);
    setStatus('New passage loaded. Start typing to begin the timer.');
    if (inputRef.current) inputRef.current.focus();
  }

  return (
    <div className={styles.game}>
      <p className={styles.instructions}>
        Type the passage shown below as accurately as you can. The timer starts when you press
        your first key. Select Finish when you are done to hear your words-per-minute and accuracy.
      </p>

      <div className={styles.panel}>
        <p className={styles.meta} id="passage-label">
          Passage to type:
        </p>
        <p className={styles.target} aria-labelledby="passage-label">
          {passage}
        </p>

        <div className={styles.field}>
          <label htmlFor="typing-input">Your typing</label>
          <textarea
            id="typing-input"
            ref={inputRef}
            className={styles.textarea}
            value={typed}
            onChange={handleChange}
            spellCheck="false"
            autoComplete="off"
            aria-describedby="passage-label"
          />
        </div>

        <p className={styles.status} role="status" aria-live="assertive">
          {status}
        </p>

        {result && (
          <p className={styles.scoreBig}>
            {result.wpm} WPM &middot; {result.accuracy}% accuracy
          </p>
        )}

        <div className={styles.controls}>
          {!result ? (
            <button type="button" className="btn btn-primary" onClick={handleFinish}>
              Finish
            </button>
          ) : (
            <button type="button" className="btn btn-primary" onClick={handleNext}>
              Next passage
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
