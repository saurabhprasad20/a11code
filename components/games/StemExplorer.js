'use client';

import { useState } from 'react';
import styles from './games.module.css';

// A small branching adventure. Each node has narrative text and a list of
// choices; some choices are puzzle answers. `end: true` marks a finish.
const STORY = {
  start: {
    text: 'You arrive at the Accessible Research Lab as the new junior scientist. Two doors face you: the Mathematics Wing on your left and the Physics Wing on your right. A voice greets you and asks where you would like to begin.',
    choices: [
      { label: 'Enter the Mathematics Wing', to: 'math-intro' },
      { label: 'Enter the Physics Wing', to: 'physics-intro' },
    ],
  },
  'math-intro': {
    text: 'In the Mathematics Wing, a locked cabinet holds the lab notebook. Its keypad shows a riddle: "I am the next number in the sequence 2, 4, 8, 16, ..." Enter the correct value to unlock it.',
    choices: [
      { label: '24', to: 'math-wrong' },
      { label: '32', to: 'math-right' },
      { label: '18', to: 'math-wrong' },
    ],
  },
  'math-wrong': {
    text: 'The keypad buzzes. The sequence doubles each time: 2, 4, 8, 16, so the next term is 16 times 2. Try once more.',
    choices: [{ label: 'Back to the keypad', to: 'math-intro' }],
  },
  'math-right': {
    text: 'The cabinet clicks open. Inside the notebook is a map to the rooftop observatory. You pocket it and feel ready for a bigger challenge.',
    choices: [
      { label: 'Head to the observatory', to: 'observatory' },
      { label: 'Explore the Physics Wing first', to: 'physics-intro' },
    ],
  },
  'physics-intro': {
    text: 'The Physics Wing hums with equipment. A colleague is calibrating a circuit and asks for help: "If a current of 2 amperes flows through a 3 ohm resistor, what is the voltage across it?" (Hint: Ohm\'s law says voltage equals current times resistance.)',
    choices: [
      { label: '5 volts', to: 'physics-wrong' },
      { label: '6 volts', to: 'physics-right' },
      { label: '1.5 volts', to: 'physics-wrong' },
    ],
  },
  'physics-wrong': {
    text: 'The meter disagrees. Ohm\'s law is voltage = current times resistance, so 2 amperes times 3 ohms. Give it another try.',
    choices: [{ label: 'Back to the circuit', to: 'physics-intro' }],
  },
  'physics-right': {
    text: 'Six volts, exactly right. Your colleague grins and hands you a keycard to the rooftop observatory as thanks.',
    choices: [
      { label: 'Head to the observatory', to: 'observatory' },
      { label: 'Visit the Mathematics Wing first', to: 'math-intro' },
    ],
  },
  observatory: {
    text: 'On the rooftop, a telescope points at the night sky. A final panel asks: "Which planet is closest to the Sun?" Answer correctly to log tonight\'s observation.',
    choices: [
      { label: 'Mercury', to: 'ending-success' },
      { label: 'Venus', to: 'observatory-wrong' },
      { label: 'Mars', to: 'observatory-wrong' },
    ],
  },
  'observatory-wrong': {
    text: 'Close, but not quite. Mercury is the innermost planet, orbiting nearest the Sun. Try the panel again.',
    choices: [{ label: 'Back to the panel', to: 'observatory' }],
  },
  'ending-success': {
    text: 'You log the observation and the lab lights glow warmly. In one evening you solved a sequence, applied Ohm\'s law, and named the innermost planet. The Accessible Research Lab is lucky to have you. The end.',
    choices: [],
    end: true,
  },
};

export default function StemExplorer() {
  const [nodeId, setNodeId] = useState('start');
  const [visited, setVisited] = useState(1);

  const node = STORY[nodeId];

  function go(to) {
    setNodeId(to);
    setVisited((v) => v + 1);
  }

  function restart() {
    setNodeId('start');
    setVisited(1);
  }

  return (
    <div className={styles.game}>
      <p className={styles.instructions}>
        Read each part of the story and choose what to do next. Some choices are puzzles &mdash;
        pick the right answer to move forward. Every choice is a button you can reach with the
        keyboard.
      </p>

      <div className={styles.panel}>
        <p className={styles.story} role="status" aria-live="polite">
          {node.text}
        </p>

        {node.end ? (
          <button type="button" className="btn btn-primary" onClick={restart}>
            Play again
          </button>
        ) : (
          <ul className={styles.choices}>
            {node.choices.map((choice) => (
              <li key={choice.to + choice.label}>
                <button
                  type="button"
                  className={styles.choiceButton}
                  onClick={() => go(choice.to)}
                >
                  {choice.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
