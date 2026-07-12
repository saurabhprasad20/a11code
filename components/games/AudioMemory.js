'use client';

import { useState, useRef } from 'react';
import styles from './games.module.css';

// Four pairs of tones (note name + frequency in Hz).
const NOTES = [
  { note: 'C', freq: 261.63 },
  { note: 'E', freq: 329.63 },
  { note: 'G', freq: 392.0 },
  { note: 'C high', freq: 523.25 },
];

function buildDeck() {
  const deck = NOTES.flatMap((n, i) => [
    { id: `${i}-a`, ...n },
    { id: `${i}-b`, ...n },
  ]);
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

export default function AudioMemory() {
  const [deck, setDeck] = useState(buildDeck);
  const [matched, setMatched] = useState([]);
  const [first, setFirst] = useState(null);
  const [locked, setLocked] = useState(false);
  const [moves, setMoves] = useState(0);
  const [status, setStatus] = useState(
    'Select any tile to hear its tone. Find the four matching pairs by ear.'
  );
  const audioRef = useRef(null);

  function playTone(freq) {
    try {
      if (!audioRef.current) {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        audioRef.current = new Ctx();
      }
      const ctx = audioRef.current;
      if (ctx.state === 'suspended') ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } catch (e) {
      /* Web Audio unavailable — the game stays playable via the text status. */
    }
  }

  const won = matched.length === deck.length;

  function handleTile(index) {
    if (locked || won) return;
    const tile = deck[index];
    if (matched.includes(tile.id) || (first && first.index === index)) return;

    playTone(tile.freq);

    if (!first) {
      setFirst({ index, tile });
      setStatus(`Tile ${index + 1} plays a tone. Now choose a tile you think matches it.`);
      return;
    }

    setMoves((m) => m + 1);
    if (first.tile.freq === tile.freq) {
      const nextMatched = [...matched, first.tile.id, tile.id];
      setMatched(nextMatched);
      setFirst(null);
      if (nextMatched.length === deck.length) {
        setStatus(`Match found! That was the last pair. You won in ${moves + 1} moves.`);
      } else {
        setStatus(`Match found! Tiles ${first.index + 1} and ${index + 1} share a tone.`);
      }
    } else {
      setLocked(true);
      setStatus(
        `No match. Tiles ${first.index + 1} and ${index + 1} play different tones. Listen again.`
      );
      setTimeout(() => {
        setFirst(null);
        setLocked(false);
      }, 900);
    }
  }

  function handleReset() {
    setDeck(buildDeck());
    setMatched([]);
    setFirst(null);
    setLocked(false);
    setMoves(0);
    setStatus('New game started. Select any tile to hear its tone.');
  }

  return (
    <div className={styles.game}>
      <p className={styles.instructions}>
        There are eight tiles hiding four pairs of musical tones. Select a tile to play its tone,
        then select another to find its match. Every tile is a button, so you can play entirely
        with the keyboard and your ears.
      </p>

      <div className={styles.panel}>
        <p className={styles.status} role="status" aria-live="assertive">
          {status}
        </p>

        <div className={styles.grid} role="group" aria-label="Memory tiles">
          {deck.map((tile, index) => {
            const isMatched = matched.includes(tile.id);
            const isActive = first && first.index === index;
            return (
              <button
                key={tile.id}
                type="button"
                className={`${styles.tile} ${isMatched ? styles.tileMatched : ''} ${
                  isActive ? styles.tileActive : ''
                }`}
                onClick={() => handleTile(index)}
                disabled={isMatched || locked}
                aria-label={
                  isMatched
                    ? `Tile ${index + 1}, matched, note ${tile.note}`
                    : `Tile ${index + 1}, play tone`
                }
              >
                {isMatched ? tile.note : index + 1}
              </button>
            );
          })}
        </div>

        <p className={styles.meta}>Moves: {moves}</p>

        <div style={{ marginTop: '1rem' }}>
          <button type="button" className="btn btn-outline" onClick={handleReset}>
            {won ? 'Play again' : 'Shuffle and restart'}
          </button>
        </div>
      </div>
    </div>
  );
}
