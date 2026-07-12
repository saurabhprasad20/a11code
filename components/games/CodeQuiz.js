'use client';

import { useState } from 'react';
import styles from './games.module.css';

const QUESTIONS = [
  {
    q: 'In Python, which built-in function displays text to the console?',
    options: ['echo()', 'print()', 'console.log()', 'write()'],
    answer: 1,
    explanation: 'print() writes output to the console in Python. console.log() belongs to JavaScript.',
  },
  {
    q: 'What does Python use to define a block of code, such as the body of a loop?',
    options: ['Curly braces { }', 'Parentheses ( )', 'Indentation', 'Semicolons'],
    answer: 2,
    explanation: 'Python uses indentation (commonly four spaces) instead of curly braces to mark code blocks.',
  },
  {
    q: 'In Java, which keyword is used to create a new object from a class?',
    options: ['create', 'new', 'make', 'object'],
    answer: 1,
    explanation: 'The new keyword allocates a new object, for example: Student s = new Student();',
  },
  {
    q: 'Which Java collection stores unique elements with no duplicates?',
    options: ['ArrayList', 'HashMap', 'HashSet', 'LinkedList'],
    answer: 2,
    explanation: 'A HashSet stores only unique values; adding a duplicate has no effect.',
  },
  {
    q: 'What is the result of the expression 10 % 3 in most programming languages?',
    options: ['3', '1', '0', '3.33'],
    answer: 1,
    explanation: 'The % operator returns the remainder of division. 10 divided by 3 leaves a remainder of 1.',
  },
  {
    q: 'Which HTML element correctly identifies the main content of a page for screen readers?',
    options: ['<div id="main">', '<main>', '<section>', '<content>'],
    answer: 1,
    explanation: 'The semantic <main> landmark lets assistive technology jump straight to the primary content.',
  },
  {
    q: 'What does the "return" statement do inside a function?',
    options: [
      'Prints a value to the screen',
      'Sends a value back to the caller and stops the function',
      'Restarts the function',
      'Declares a variable',
    ],
    answer: 1,
    explanation: 'return hands a value back to whoever called the function and ends the function immediately.',
  },
  {
    q: 'Which loop is guaranteed to run its body at least once in languages that support it?',
    options: ['for loop', 'while loop', 'do-while loop', 'foreach loop'],
    answer: 2,
    explanation: 'A do-while loop checks its condition after running the body, so the body always executes once.',
  },
];

export default function CodeQuiz() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [status, setStatus] = useState('');

  const question = QUESTIONS[index];

  function handleCheck() {
    if (selected === null) {
      setStatus('Please choose an answer first.');
      return;
    }
    setAnswered(true);
    if (selected === question.answer) {
      setScore((s) => s + 1);
      setStatus('Correct!');
    } else {
      setStatus(`Not quite. The correct answer is: ${question.options[question.answer]}.`);
    }
  }

  function handleNext() {
    if (index + 1 >= QUESTIONS.length) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setAnswered(false);
    setStatus('');
  }

  function handleRestart() {
    setIndex(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setFinished(false);
    setStatus('');
  }

  if (finished) {
    return (
      <div className={styles.game}>
        <div className={styles.panel}>
          <h2>Quiz complete</h2>
          <p className={styles.scoreBig} role="status" aria-live="polite">
            You scored {score} out of {QUESTIONS.length}.
          </p>
          <p>
            {score === QUESTIONS.length
              ? 'A perfect score. Excellent work!'
              : score >= QUESTIONS.length / 2
              ? 'Well done. Review the explanations and try again to beat your score.'
              : 'Good effort. Revisit the courses and give it another go.'}
          </p>
          <button type="button" className="btn btn-primary" onClick={handleRestart}>
            Play again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.game}>
      <p className={styles.instructions}>
        Answer each multiple-choice question, then select Check answer. There are{' '}
        {QUESTIONS.length} questions in total.
      </p>

      <div className={styles.panel}>
        <p className={styles.progress}>
          Question {index + 1} of {QUESTIONS.length} &middot; Score: {score}
        </p>

        <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
          <legend style={{ fontWeight: 700, fontSize: '1.15rem', marginBottom: '0.75rem' }}>
            {question.q}
          </legend>
          <ul className={styles.options}>
            {question.options.map((opt, i) => (
              <li key={i}>
                <label
                  className={`${styles.option} ${selected === i ? styles.optionSelected : ''}`}
                >
                  <input
                    type="radio"
                    name={`question-${index}`}
                    checked={selected === i}
                    onChange={() => setSelected(i)}
                    disabled={answered}
                  />
                  <span>{opt}</span>
                </label>
              </li>
            ))}
          </ul>
        </fieldset>

        <p className={styles.status} role="status" aria-live="assertive">
          {status}
        </p>

        {answered && <p className={styles.explanation}>{question.explanation}</p>}

        <div className={styles.controls}>
          {!answered ? (
            <button type="button" className="btn btn-primary" onClick={handleCheck}>
              Check answer
            </button>
          ) : (
            <button type="button" className="btn btn-primary" onClick={handleNext}>
              {index + 1 >= QUESTIONS.length ? 'See results' : 'Next question'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
