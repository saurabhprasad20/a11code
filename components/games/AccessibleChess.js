'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Chess } from 'chess.js';
import { chooseMove } from './chessBot';
import styles from './games.module.css';

const PIECE_NAMES = { p: 'pawn', n: 'knight', b: 'bishop', r: 'rook', q: 'queen', k: 'king' };
const COLOR_NAMES = { w: 'White', b: 'Black' };
// Decorative Unicode glyphs (aria-hidden); the accessible name comes from labels.
const GLYPHS = {
  w: { k: '\u2654', q: '\u2655', r: '\u2656', b: '\u2657', n: '\u2658', p: '\u2659' },
  b: { k: '\u265A', q: '\u265B', r: '\u265C', b: '\u265D', n: '\u265E', p: '\u265F' },
};

const RATE_OPTIONS = [
  { label: 'Slow', value: 0.85 },
  { label: 'Normal', value: 1.05 },
  { label: 'Fast', value: 1.3 },
];
const DIFFICULTY = [
  { label: 'Easy', value: 1 },
  { label: 'Medium', value: 2 },
  { label: 'Hard', value: 3 },
];

function squareOf(col, row) {
  // row 0 = rank 8 (top), col 0 = file a (left)
  return String.fromCharCode(97 + col) + (8 - row);
}

function describePiece(piece) {
  if (!piece) return 'empty';
  return `${COLOR_NAMES[piece.color]} ${PIECE_NAMES[piece.type]}`;
}

// Spell a square so speech reads it clearly, e.g. "e2".
function saySquare(square) {
  return `${square[0]}${square[1]}`;
}

function pickVoice(list, prefer) {
  if (!list || !list.length) return null;
  const en = list.filter((v) => /^en/i.test(v.lang));
  const pool = en.length ? en : list;
  if (prefer && pool.some((v) => v.voiceURI === prefer)) return pool.find((v) => v.voiceURI === prefer);
  return pool.find((v) => /en[-_](us|gb|in|au)/i.test(v.lang)) || pool[0];
}

export default function AccessibleChess() {
  const [phase, setPhase] = useState('setup'); // setup | playing | over
  const [playerColor, setPlayerColor] = useState('w');
  const [difficulty, setDifficulty] = useState(2);
  const [speechOn, setSpeechOn] = useState(false);
  const [rate, setRate] = useState(1.05);
  const [voices, setVoices] = useState([]);
  const [voiceURI, setVoiceURI] = useState('');

  const [fen, setFen] = useState(new Chess().fen());
  const [cursor, setCursor] = useState({ col: 4, row: 7 }); // e1
  const [selected, setSelected] = useState(null); // square string or null
  const [targets, setTargets] = useState(() => new Set());
  const [status, setStatus] = useState('');
  const [thinking, setThinking] = useState(false);
  const [lastMove, setLastMove] = useState(null); // { from, to }
  const [result, setResult] = useState(null);

  const gameRef = useRef(new Chess());
  const cellRefs = useRef({});
  const gridFocusedRef = useRef(false);
  const synthRef = useRef(null);
  const speechOnRef = useRef(false);
  const rateRef = useRef(1.05);
  const voiceURIRef = useRef('');

  useEffect(() => { speechOnRef.current = speechOn; }, [speechOn]);
  useEffect(() => { rateRef.current = rate; }, [rate]);
  useEffect(() => { voiceURIRef.current = voiceURI; }, [voiceURI]);

  const board = useMemo(() => new Chess(fen).board(), [fen]);
  const chessView = useMemo(() => new Chess(fen), [fen]);

  // Load speech voices and saved preferences.
  useEffect(() => {
    try {
      const sv = localStorage.getItem('chessSpeech');
      if (sv === 'on') setSpeechOn(true);
      const r = parseFloat(localStorage.getItem('chessRate'));
      if (r && !Number.isNaN(r)) setRate(r);
      const d = parseInt(localStorage.getItem('chessDifficulty'), 10);
      if (d >= 1 && d <= 3) setDifficulty(d);
      const c = localStorage.getItem('chessColor');
      if (c === 'w' || c === 'b') setPlayerColor(c);
    } catch (e) { /* ignore */ }

    const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    if (!synth) return undefined;
    synthRef.current = synth;
    let savedVoice = '';
    try { savedVoice = localStorage.getItem('chessVoice') || ''; } catch (e) { /* ignore */ }
    const load = () => {
      const all = synth.getVoices();
      if (!all.length) return;
      setVoices(all);
      setVoiceURI((prev) => prev || pickVoice(all, savedVoice)?.voiceURI || '');
    };
    load();
    synth.addEventListener('voiceschanged', load);
    return () => { synth.removeEventListener('voiceschanged', load); synth.cancel(); };
  }, []);

  useEffect(() => () => { if (synthRef.current) synthRef.current.cancel(); }, []);

  const speak = useCallback((text) => {
    const synth = synthRef.current;
    if (!synth || !speechOnRef.current || !text) return;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const v = synth.getVoices().find((x) => x.voiceURI === voiceURIRef.current);
    if (v) u.voice = v;
    u.rate = rateRef.current;
    synth.speak(u);
  }, []);

  // Announce an event: shown in the assertive status region (so screen readers
  // read it) and spoken aloud when the self-voice option is on.
  const announce = useCallback((text) => {
    setStatus(text);
    speak(text);
  }, [speak]);

  const persist = (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } };

  const focusCell = useCallback((col, row) => {
    const el = cellRefs.current[`${col},${row}`];
    if (el && gridFocusedRef.current) el.focus();
  }, []);

  const kingInCheckSquare = useMemo(() => {
    if (!chessView.isCheck()) return null;
    const turn = chessView.turn();
    const b = chessView.board();
    for (let r = 0; r < 8; r += 1) {
      for (let f = 0; f < 8; f += 1) {
        const p = b[r][f];
        if (p && p.type === 'k' && p.color === turn) return squareOf(f, r);
      }
    }
    return null;
  }, [chessView]);

  function cellLabel(col, row) {
    const square = squareOf(col, row);
    const piece = chessView.get(square);
    const parts = [describePiece(piece), square];
    if (selected === square) parts.push('selected');
    if (targets.has(square)) parts.push(piece ? 'can capture here' : 'legal move');
    if (kingInCheckSquare === square) parts.push('in check');
    return parts.join(', ');
  }

  function describeMove(move) {
    const mover = COLOR_NAMES[move.color];
    let text = `${mover} ${PIECE_NAMES[move.piece]} ${saySquare(move.from)} to ${saySquare(move.to)}`;
    if (move.flags.includes('k')) text = `${mover} castles kingside`;
    else if (move.flags.includes('q')) text = `${mover} castles queenside`;
    if (move.captured) text += `, captures ${PIECE_NAMES[move.captured]}`;
    if (move.promotion) text += `, promotes to ${PIECE_NAMES[move.promotion]}`;
    return text;
  }

  function outcomeText(chess, justMovedColor) {
    if (chess.isCheckmate()) {
      const won = justMovedColor === playerColor;
      return { over: true, text: `Checkmate. ${won ? 'You win!' : 'Dobby wins.'}`, won };
    }
    if (chess.isStalemate()) return { over: true, text: 'Stalemate. The game is a draw.' };
    if (chess.isInsufficientMaterial()) return { over: true, text: 'Draw by insufficient material.' };
    if (chess.isThreefoldRepetition()) return { over: true, text: 'Draw by threefold repetition.' };
    if (chess.isDraw()) return { over: true, text: 'The game is a draw.' };
    if (chess.isCheck()) return { over: false, text: 'Check!' };
    return { over: false, text: '' };
  }

  const syncFromGame = useCallback(() => {
    setFen(gameRef.current.fen());
  }, []);

  // Let the bot make its reply, off the paint path so "thinking" shows first.
  const botMove = useCallback(() => {
    const chess = gameRef.current;
    if (chess.isGameOver()) return;
    setThinking(true);
    announce('Dobby is thinking.');
    window.setTimeout(() => {
      let move;
      try {
        const verbose = chooseMove(chess.fen(), difficulty);
        if (!verbose) { setThinking(false); return; }
        move = chess.move({ from: verbose.from, to: verbose.to, promotion: verbose.promotion });
      } catch (e) {
        setThinking(false);
        return;
      }
      setThinking(false);
      setLastMove({ from: move.from, to: move.to });
      syncFromGame();
      const outcome = outcomeText(chess, move.color);
      const suffix = outcome.text ? ` ${outcome.text}` : '';
      announce(`Dobby plays ${describeMove(move)}.${suffix} Your move.`);
      // Bring the cursor to Dobby's destination square for convenience.
      const col = move.to.charCodeAt(0) - 97;
      const row = 8 - parseInt(move.to[1], 10);
      setCursor({ col, row });
      focusCell(col, row);
      if (outcome.over) { setResult(outcome); setPhase('over'); }
    }, 60);
  }, [difficulty, announce, syncFromGame, focusCell, playerColor]);

  function startGame() {
    const chess = new Chess();
    gameRef.current = chess;
    setFen(chess.fen());
    setSelected(null);
    setTargets(new Set());
    setResult(null);
    setLastMove(null);
    setPhase('playing');
    persist('chessSpeech', speechOn ? 'on' : 'off');
    persist('chessRate', String(rate));
    persist('chessDifficulty', String(difficulty));
    persist('chessColor', playerColor);
    persist('chessVoice', voiceURI);
    // Cursor at the player's back rank king square.
    const startCursor = playerColor === 'w' ? { col: 4, row: 7 } : { col: 4, row: 0 };
    setCursor(startCursor);
    if (playerColor === 'w') {
      announce('New game. You are White and move first. Use the arrow keys to move around the board, and press Enter to pick up a piece.');
    } else {
      announce('New game. You are Black. Dobby will move first.');
      window.setTimeout(() => botMove(), 400);
    }
  }

  function backToSetup() {
    if (synthRef.current) synthRef.current.cancel();
    setPhase('setup');
    setStatus('');
  }

  function selectSquare(square) {
    const chess = gameRef.current;
    const piece = chess.get(square);
    if (!piece || piece.color !== playerColor) {
      announce(`${describePiece(piece)} on ${saySquare(square)}. That is not your piece to move.`);
      return;
    }
    const moves = chess.moves({ square, verbose: true });
    if (moves.length === 0) {
      announce(`${describePiece(piece)} on ${saySquare(square)} has no legal moves.`);
      return;
    }
    setSelected(square);
    setTargets(new Set(moves.map((m) => m.to)));
    const list = moves.map((m) => saySquare(m.to)).join(', ');
    announce(`Picked up ${describePiece(piece)} on ${saySquare(square)}. ${moves.length} legal ${moves.length === 1 ? 'move' : 'moves'}: ${list}. Move to a square and press Enter to play, or press Escape to put it back.`);
  }

  function tryMove(from, to) {
    const chess = gameRef.current;
    const legal = chess.moves({ square: from, verbose: true }).find((m) => m.to === to);
    if (!legal) {
      announce(`That is not a legal move for the ${PIECE_NAMES[chess.get(from).type]}. Still holding it. Choose another square, or Escape to cancel.`);
      return;
    }
    const move = chess.move({ from, to, promotion: legal.promotion ? 'q' : undefined });
    setSelected(null);
    setTargets(new Set());
    setLastMove({ from: move.from, to: move.to });
    syncFromGame();
    const outcome = outcomeText(chess, move.color);
    const suffix = outcome.text ? ` ${outcome.text}` : '';
    announce(`You play ${describeMove(move)}.${suffix}`);
    if (outcome.over) { setResult(outcome); setPhase('over'); return; }
    window.setTimeout(() => botMove(), 80);
  }

  function activateCursor() {
    const chess = gameRef.current;
    if (phase !== 'playing' || thinking || chess.turn() !== playerColor) return;
    const square = squareOf(cursor.col, cursor.row);
    if (!selected) {
      selectSquare(square);
    } else if (square === selected) {
      setSelected(null);
      setTargets(new Set());
      announce('Put the piece back down.');
    } else if (chess.get(square) && chess.get(square).color === playerColor) {
      // Switch to another of your own pieces.
      selectSquare(square);
    } else {
      tryMove(selected, square);
    }
  }

  function onGridKeyDown(e) {
    const key = e.key;
    if (key === 'ArrowUp' || key === 'ArrowDown' || key === 'ArrowLeft' || key === 'ArrowRight') {
      e.preventDefault();
      setCursor((cur) => {
        let { col, row } = cur;
        if (key === 'ArrowUp') row = Math.max(0, row - 1);
        else if (key === 'ArrowDown') row = Math.min(7, row + 1);
        else if (key === 'ArrowLeft') col = Math.max(0, col - 1);
        else if (key === 'ArrowRight') col = Math.min(7, col + 1);
        if (col !== cur.col || row !== cur.row) {
          focusCell(col, row);
          if (speechOnRef.current) speak(cellLabel(col, row));
        }
        return { col, row };
      });
    } else if (key === 'Enter' || key === ' ') {
      e.preventDefault();
      activateCursor();
    } else if (key === 'Escape') {
      if (selected) {
        e.preventDefault();
        setSelected(null);
        setTargets(new Set());
        announce('Cancelled. Piece put back.');
      }
    } else if (key.toLowerCase() === 'm') {
      e.preventDefault();
      reportState();
    }
  }

  function reportState() {
    const chess = gameRef.current;
    const turn = chess.turn();
    const whose = turn === playerColor ? 'your' : "Dobby's";
    let text = `It is ${whose} move.`;
    if (chess.isCheck()) text += ` ${COLOR_NAMES[turn]} is in check.`;
    if (selected) {
      text += ` You are holding a piece from ${saySquare(selected)}.`;
    }
    const cur = squareOf(cursor.col, cursor.row);
    text += ` Cursor on ${cellLabel(cursor.col, cursor.row)}.`;
    announce(text);
  }

  // ---------- SETUP ----------
  if (phase === 'setup') {
    return (
      <div className={styles.game}>
        <p className={styles.instructions}>
          Chess you can play by ear. The board is a grid you move around with the arrow keys; each
          square announces the piece on it and its coordinate, for example &ldquo;White pawn,
          e2&rdquo;. Press Enter to pick up one of your pieces &mdash; you will hear its legal moves
          &mdash; then move to a target square and press Enter again to play. Dobby, the computer,
          replies and every move, capture, check, and result is announced aloud.
        </p>
        <p className={styles.recommend}>
          <strong>Keys while playing:</strong> arrow keys move around the board; <strong>Enter</strong>{' '}
          or <strong>Space</strong> picks up and puts down a piece; <strong>Escape</strong> cancels a
          pick-up; <strong>M</strong> repeats whose move it is and where your cursor is. Your screen
          reader will read each square as you arrow onto it.
        </p>

        <div className={styles.panel}>
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Play as</legend>
            <div className={styles.controls} style={{ marginTop: 0 }}>
              <label className={`${styles.option} ${playerColor === 'w' ? styles.optionSelected : ''}`}>
                <input type="radio" name="chess-color" value="w" checked={playerColor === 'w'}
                  onChange={() => setPlayerColor('w')} />
                <span>White (you move first)</span>
              </label>
              <label className={`${styles.option} ${playerColor === 'b' ? styles.optionSelected : ''}`}>
                <input type="radio" name="chess-color" value="b" checked={playerColor === 'b'}
                  onChange={() => setPlayerColor('b')} />
                <span>Black (Dobby moves first)</span>
              </label>
            </div>
          </fieldset>

          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Difficulty</legend>
            <div className={styles.field} style={{ marginTop: 0 }}>
              <label htmlFor="chess-difficulty">How strong should Dobby be?</label>
              <select id="chess-difficulty" className={styles.input} value={difficulty}
                onChange={(e) => setDifficulty(parseInt(e.target.value, 10))}>
                {DIFFICULTY.map((d) => (
                  <option key={d.value} value={d.value}>{d.label}</option>
                ))}
              </select>
            </div>
          </fieldset>

          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Spoken feedback</legend>
            <label className={styles.option} style={{ marginBottom: '0.75rem' }}>
              <input type="checkbox" checked={speechOn} onChange={(e) => setSpeechOn(e.target.checked)} />
              <span>Also speak with the game&rsquo;s own voice (for playing without a screen reader)</span>
            </label>
            {speechOn && voices.length > 0 && (
              <div className={styles.settingsRow} style={{ borderTop: 'none', paddingTop: 0, marginTop: 0 }}>
                <div className={styles.field}>
                  <label htmlFor="chess-voice">Voice</label>
                  <select id="chess-voice" className={styles.input} value={voiceURI}
                    onChange={(e) => setVoiceURI(e.target.value)}>
                    {voices.filter((v) => /^en/i.test(v.lang)).map((v) => (
                      <option key={v.voiceURI} value={v.voiceURI}>{v.name} ({v.lang})</option>
                    ))}
                  </select>
                </div>
                <div className={styles.field}>
                  <label htmlFor="chess-rate">Speaking speed</label>
                  <select id="chess-rate" className={styles.input} value={rate}
                    onChange={(e) => setRate(parseFloat(e.target.value))}>
                    {RATE_OPTIONS.map((r) => (<option key={r.value} value={r.value}>{r.label}</option>))}
                  </select>
                </div>
              </div>
            )}
          </fieldset>

          <div style={{ marginTop: '1.25rem' }}>
            <button type="button" className="btn btn-primary" onClick={startGame}>Start game</button>
          </div>
        </div>
      </div>
    );
  }

  // ---------- PLAYING / OVER ----------
  const turn = chessView.turn();
  const whoseTurn = phase === 'over'
    ? 'Game over'
    : (turn === playerColor ? 'Your move' : 'Dobby\u2019s move');

  return (
    <div className={styles.game}>
      <p className={styles.politeLive} role="status" aria-live="assertive">{status}</p>

      <div className={styles.panel}>
        <div className={styles.chessBar}>
          <p className={styles.chessTurn}>
            <strong>{whoseTurn}</strong>
            {thinking && <span> &mdash; Dobby is thinking&hellip;</span>}
          </p>
          <div className={styles.controls} style={{ marginTop: 0 }}>
            <button type="button" className="btn btn-outline" onClick={reportState}>Where am I? (M)</button>
            <button type="button" className="btn btn-outline" onClick={startGame}>New game</button>
            <button type="button" className="btn btn-outline" onClick={backToSetup}>Settings</button>
          </div>
        </div>

        <div
          className={styles.chessBoard}
          role="grid"
          aria-label="Chess board. Use arrow keys to move, Enter to pick up or play a piece."
          onFocus={() => { gridFocusedRef.current = true; }}
          onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) gridFocusedRef.current = false; }}
          onKeyDown={onGridKeyDown}
        >
          {board.map((rankRow, row) => (
            // eslint-disable-next-line react/no-array-index-key
            <div className={styles.chessRow} role="row" key={row}>
              {rankRow.map((piece, col) => {
                const square = squareOf(col, row);
                const isCursor = cursor.col === col && cursor.row === row;
                const isLight = (col + row) % 2 === 0;
                const cls = [
                  styles.chessCell,
                  isLight ? styles.chessLight : styles.chessDark,
                  isCursor ? styles.chessCursor : '',
                  selected === square ? styles.chessSelected : '',
                  targets.has(square) ? styles.chessTarget : '',
                  kingInCheckSquare === square ? styles.chessCheck : '',
                ].join(' ');
                return (
                  <button
                    type="button"
                    role="gridcell"
                    key={square}
                    ref={(el) => { cellRefs.current[`${col},${row}`] = el; }}
                    className={cls}
                    tabIndex={isCursor ? 0 : -1}
                    aria-label={cellLabel(col, row)}
                    aria-selected={selected === square}
                    onClick={() => { setCursor({ col, row }); focusCell(col, row); activateCursorAt(col, row); }}
                  >
                    <span aria-hidden="true">{piece ? GLYPHS[piece.color][piece.type] : ''}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <p className={styles.meta}>
          Arrow keys move around the board. Enter picks up a piece and, once you are holding one,
          plays it onto the highlighted square. Escape puts a piece back. Press M any time to hear
          whose move it is and where your cursor is.
        </p>

        {phase === 'over' && result && (
          <div className={styles.chessResult} role="alert">
            <p className={styles.scoreBig}>{result.text}</p>
            <div className={styles.controls}>
              <button type="button" className="btn btn-primary" onClick={startGame}>Play again</button>
              <button type="button" className="btn btn-outline" onClick={backToSetup}>Settings</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Click support: set cursor then activate, mirroring keyboard behaviour.
  function activateCursorAt(col, row) {
    const chess = gameRef.current;
    if (phase !== 'playing' || thinking || chess.turn() !== playerColor) return;
    const square = squareOf(col, row);
    if (!selected) selectSquare(square);
    else if (square === selected) { setSelected(null); setTargets(new Set()); announce('Put the piece back down.'); }
    else if (chess.get(square) && chess.get(square).color === playerColor) selectSquare(square);
    else tryMove(selected, square);
  }
}
