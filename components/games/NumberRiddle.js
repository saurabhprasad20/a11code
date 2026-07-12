'use client';

import { useState } from 'react';
import styles from './games.module.css';

const MAX = 100;

function newTarget() {
  return Math.floor(Math.random() * MAX) + 1;
}

export default function NumberRiddle() {
  const [target, setTarget] = useState(newTarget);
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [status, setStatus] = useState(
    `I am thinking of a number between 1 and ${MAX}. Enter your guess.`
  );
  const [solved, setSolved] = useState(false);
  const [isError, setIsError] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const value = Number(guess);
    if (!Number.isInteger(value) || value < 1 || value > MAX) {
      setIsError(true);
      setStatus(`Please enter a whole number between 1 and ${MAX}.`);
      return;
    }
    setIsError(false);
    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);

    if (value === target) {
      setSolved(true);
      setStatus(
        `Correct! The number was ${target}. You found it in ${nextAttempts} ${
          nextAttempts === 1 ? 'try' : 'tries'
        }.`
      );
    } else if (value < target) {
      setStatus(`${value} is too low. Try a higher number. Attempts so far: ${nextAttempts}.`);
    } else {
      setStatus(`${value} is too high. Try a lower number. Attempts so far: ${nextAttempts}.`);
    }
    setGuess('');
  }

  function handleReset() {
    setTarget(newTarget());
    setGuess('');
    setAttempts(0);
    setSolved(false);
    setIsError(false);
    setStatus(`New game started. I am thinking of a number between 1 and ${MAX}. Enter your guess.`);
  }

  return (
    <div className={styles.game}>
      <p className={styles.instructions}>
        I have picked a secret whole number between 1 and {MAX}. Enter a guess and I will tell
        you whether the secret number is higher or lower. Keep going until you find it in as few
        tries as possible.
      </p>

      <div className={styles.panel}>
        <p
          className={`${styles.status} ${isError ? styles.statusError : ''}`}
          role="status"
          aria-live="assertive"
        >
          {status}
        </p>

        {!solved && (
          <form onSubmit={handleSubmit} className={styles.controls}>
            <div className={styles.field}>
              <label htmlFor="riddle-guess">Your guess (1 to {MAX})</label>
              <input
                id="riddle-guess"
                className={styles.input}
                type="number"
                min="1"
                max={MAX}
                inputMode="numeric"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                autoComplete="off"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit guess
            </button>
          </form>
        )}

        <div style={{ marginTop: '1rem' }}>
          <button type="button" className="btn btn-outline" onClick={handleReset}>
            {solved ? 'Play again' : 'Start over'}
          </button>
        </div>
      </div>
    </div>
  );
}
