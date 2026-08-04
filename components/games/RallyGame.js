'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import sounds from './rallySounds';
import styles from './games.module.css';

const LANES = 8;
const START_CHANCES = 10;

// Difficulty presets. `ballSpeed` is in court-lengths per second; the court is
// the vertical distance between the two baselines. `trick` scales pace/spin.
const LEVELS = {
  easy: { label: 'Easy', ballSpeed: 0.28, botSpeed: 5, botCatch: 0.6, trick: 0.3 },
  medium: { label: 'Medium', ballSpeed: 0.4, botSpeed: 8, botCatch: 0.76, trick: 0.55 },
  hard: { label: 'Hard', ballSpeed: 0.56, botSpeed: 12, botCatch: 0.88, trick: 0.9 },
};

// y runs 0 (your baseline, bottom) .. 1 (Dobby's baseline, top).
const PLAYER_ZONE = 0.2; // you may swing when the ball is within this of the bottom
const BOT_ZONE = 0.9; // Dobby resolves its shot when the ball reaches here

// The ball's true position is spatialised in 3D by the sound engine from the
// lane number itself; the visual court derives its left offset directly.


function loadStat(key, def) {
  try {
    const v = localStorage.getItem(key);
    return v == null ? def : v;
  } catch (e) { return def; }
}

export default function RallyGame() {
  const [phase, setPhase] = useState('setup'); // setup | playing | over
  const [levelId, setLevelId] = useState('easy');
  const [supported, setSupported] = useState(true);

  const [playerScore, setPlayerScore] = useState(START_CHANCES);
  const [botScore, setBotScore] = useState(START_CHANCES);
  const [playerLane, setPlayerLane] = useState(4);
  const [status, setStatus] = useState('');
  const [result, setResult] = useState(null);
  const [record, setRecord] = useState({ wins: 0, losses: 0 });

  // Fast-changing game state lives in refs so the animation loop never waits on
  // React re-renders.
  const ball = useRef({ active: false });
  const playerLaneRef = useRef(4);
  const botLaneRef = useRef(4);
  const lastSwingRef = useRef(0);
  const botResolvedRef = useRef(false);
  const rafRef = useRef(null);
  const lastTsRef = useRef(0);
  const lastBeepRef = useRef(0);
  const phaseRef = useRef('setup');
  const levelRef = useRef(LEVELS.easy);
  const playerScoreRef = useRef(START_CHANCES);
  const botScoreRef = useRef(START_CHANCES);
  const serveTimerRef = useRef(null);
  const ballDotRef = useRef(null);
  const boardRef = useRef(null);

  useEffect(() => { phaseRef.current = phase; }, [phase]);
  useEffect(() => { playerLaneRef.current = playerLane; }, [playerLane]);

  useEffect(() => {
    setLevelId(loadStat('rallyLevel', 'easy'));
    try {
      const w = parseInt(localStorage.getItem('rallyWins'), 10) || 0;
      const l = parseInt(localStorage.getItem('rallyLosses'), 10) || 0;
      setRecord({ wins: w, losses: l });
    } catch (e) { /* ignore */ }
    if (typeof window !== 'undefined' && !(window.AudioContext || window.webkitAudioContext)) {
      setSupported(false);
    }
  }, []);

  const announce = useCallback((text) => {
    setStatus(text);
  }, []);

  const persist = (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } };

  // Reflect the ball onto the simple visual court (direct DOM writes so the
  // 60fps loop does not thrash React).
  function paintBall() {
    const dot = ballDotRef.current;
    const b = ball.current;
    if (!dot) return;
    if (!b.active) { dot.style.opacity = '0'; return; }
    dot.style.opacity = '1';
    const left = (b.laneFloat / (LANES - 1)) * 100;
    const top = 6 + (1 - b.y) * 86;
    dot.style.left = `${left}%`;
    dot.style.top = `${top}%`;
  }

  const updateLock = useCallback(() => {
    const b = ball.current;
    const aligned = b.active && b.dir === 'down' && Math.round(b.laneFloat) === playerLaneRef.current;
    sounds.lockOn(!!aligned);
  }, []);

  const endGame = useCallback((playerWon) => {
    ball.current.active = false;
    sounds.ballStop();
    sounds.lockOn(false);
    sounds.ambienceStop();
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    const nextRecord = {
      wins: record.wins + (playerWon ? 1 : 0),
      losses: record.losses + (playerWon ? 0 : 1),
    };
    setRecord(nextRecord);
    persist('rallyWins', String(nextRecord.wins));
    persist('rallyLosses', String(nextRecord.losses));
    if (playerWon) sounds.win(); else sounds.lose();
    setResult({ playerWon });
    setPhase('over');
    phaseRef.current = 'over';
    announce(playerWon
      ? 'Game over. You beat Dobby! Press Space or Enter to play again.'
      : 'Game over. Dobby wins this time. Press Space or Enter to play again.');
  }, [record, announce]);

  const serve = useCallback(() => {
    if (phaseRef.current !== 'playing') return;
    const lane = Math.floor(Math.random() * LANES);
    const lvl = levelRef.current;
    const roll = Math.random();
    // Higher difficulty brings more pace and spin deliveries.
    let type = 'straight';
    if (roll < 0.25 * lvl.trick + 0.1) type = 'pace';
    else if (roll < 0.55 * lvl.trick + 0.15) type = 'spin';
    const spinRate = type === 'spin' ? (Math.random() < 0.5 ? -1 : 1) * (0.6 + lvl.trick * 0.9) : 0;
    ball.current = {
      active: true,
      dir: 'down',
      y: 1,
      laneFloat: lane,
      speed: lvl.ballSpeed,
      type,
      spinRate,
      paceApplied: false,
      quality: 0,
      botFailed: null,
    };
    lastSwingRef.current = 0;
    botResolvedRef.current = false;
    lastBeepRef.current = 0;
    sounds.serveCue();
    sounds.ballStart();
    announce('Dobby serves. Find the ball by its sound, line up your bat, and hit Up when it is closest.');
  }, [announce]);

  const scheduleServe = useCallback((delay) => {
    if (serveTimerRef.current) window.clearTimeout(serveTimerRef.current);
    serveTimerRef.current = window.setTimeout(() => { serve(); }, delay);
  }, [serve]);

  // A point has ended. `loser` is 'player' or 'bot'. A point is lost only by the
  // ball reaching that player's baseline unreturned — there are no sideways or
  // early penalties.
  const resolvePoint = useCallback((loser) => {
    const b = ball.current;
    const lane = b.laneFloat;
    b.active = false;
    sounds.ballStop();
    sounds.lockOn(false);
    paintBall();

    if (loser === 'player') {
      sounds.fallAndCrash(lane, 'near');
      sounds.pointLost();
      const next = playerScoreRef.current - 1;
      playerScoreRef.current = next;
      setPlayerScore(next);
      announce(`Missed! It got past your bat. You lose a chance. Score, you ${next}, Dobby ${botScoreRef.current}.`);
      if (next <= 0) { endGame(false); return; }
    } else {
      // The ball beat Dobby and crashed at his end.
      sounds.fallAndCrash(lane, 'far');
      sounds.pointWon();
      const next = botScoreRef.current - 1;
      botScoreRef.current = next;
      setBotScore(next);
      announce(`Past Dobby! He could not reach it. You win a chance. Score, you ${playerScoreRef.current}, Dobby ${next}.`);
      if (next <= 0) { endGame(true); return; }
    }
    scheduleServe(1400);
  }, [announce, endGame, scheduleServe]);

  // Dobby's return attempt when the ball reaches the top zone. On a miss the
  // ball is allowed to keep travelling up past Dobby (so you hear it complete
  // the trip) and the point resolves only when it reaches his baseline.
  function botAttempt() {
    const b = ball.current;
    botResolvedRef.current = true;
    const lvl = levelRef.current;
    const laneDiff = Math.abs(botLaneRef.current - b.laneFloat);
    // Strong player returns are harder to read.
    const catchProb = Math.max(0.15, lvl.botCatch - b.quality * 0.28);
    const reached = laneDiff <= 0.7;
    if (reached && Math.random() < catchProb) {
      // Dobby returns it: send it back down, possibly with a new trick.
      sounds.takBot(b.laneFloat);
      b.dir = 'down';
      b.y = BOT_ZONE;
      b.speed = lvl.ballSpeed * (1 + Math.random() * 0.3 * lvl.trick);
      b.paceApplied = false;
      lastSwingRef.current = 0;
      const roll = Math.random();
      b.type = roll < 0.3 * lvl.trick ? 'pace' : (roll < 0.6 * lvl.trick ? 'spin' : 'straight');
      b.spinRate = b.type === 'spin' ? (Math.random() < 0.5 ? -1 : 1) * (0.6 + lvl.trick * 0.9) : 0;
      lastBeepRef.current = 0;
    } else {
      // Dobby has beaten it; let the ball run on to his baseline before the
      // point is awarded, so you hear it complete the trip.
      b.botFailed = 'miss';
    }
  }

  // The player swings. You can swing as often as you like as the ball comes;
  // a swing succeeds only when the ball is in your zone AND your bat is in its
  // lane, in which case it always goes back to Dobby. A swing that connects with
  // nothing is a harmless whiff with no penalty. You only lose the point if the
  // ball reaches your baseline without a successful hit.
  const swing = useCallback(() => {
    const b = ball.current;
    if (phaseRef.current !== 'playing' || !b.active || b.dir !== 'down') return;
    const now = (typeof performance !== 'undefined' ? performance.now() : Date.now());
    if (now - lastSwingRef.current < 130) return; // debounce key auto-repeat
    lastSwingRef.current = now;
    const inZone = b.y <= PLAYER_ZONE;
    const aligned = Math.round(b.laneFloat) === playerLaneRef.current;
    if (inZone && aligned) {
      const quality = 1 - b.y / PLAYER_ZONE; // near the baseline = better timed
      b.quality = quality;
      sounds.takPlayer(b.laneFloat);
      b.dir = 'up';
      b.y = Math.max(b.y, 0.05);
      const lvl = levelRef.current;
      b.speed = lvl.ballSpeed * (1 + quality * 0.6);
      b.botFailed = null;
      botResolvedRef.current = false;
      announce(quality > 0.6 ? 'Sweetly timed! Back to Dobby.' : 'Good return! Back to Dobby.');
    } else {
      // Missed the ball this time — no penalty, swing again as it comes.
      sounds.whiff(b.laneFloat);
    }
  }, [announce]);

  // The main animation loop.
  const loop = useCallback((ts) => {
    if (phaseRef.current !== 'playing') { rafRef.current = null; return; }
    const b = ball.current;
    if (!lastTsRef.current) lastTsRef.current = ts;
    const dt = Math.min(0.05, (ts - lastTsRef.current) / 1000);
    lastTsRef.current = ts;

    if (b.active) {
      // Pace deliveries surge in the second half of their travel.
      if (b.type === 'pace' && !b.paceApplied
        && ((b.dir === 'down' && b.y < 0.55) || (b.dir === 'up' && b.y > 0.45))) {
        b.speed *= 1.5;
        b.paceApplied = true;
        sounds.paceCue(b.laneFloat);
      }
      // Spin drifts the lane, reflecting off the side walls so it never leaves.
      if (b.spinRate) {
        b.laneFloat += b.spinRate * dt;
        if (b.laneFloat < 0) { b.laneFloat = 0; b.spinRate *= -1; }
        else if (b.laneFloat > LANES - 1) { b.laneFloat = LANES - 1; b.spinRate *= -1; }
      }
      // Move the ball.
      b.y += (b.dir === 'down' ? -1 : 1) * b.speed * dt;

      // Dobby chases the ball while it climbs toward him.
      if (b.dir === 'up') {
        const lvl = levelRef.current;
        const diff = b.laneFloat - botLaneRef.current;
        const step = Math.sign(diff) * Math.min(Math.abs(diff), lvl.botSpeed * dt);
        botLaneRef.current += step;
      }

      // 3D audio: nearness = proximity to you (y = 0 is your baseline).
      const nearness = 1 - b.y;
      sounds.ballUpdate({ lane: b.laneFloat, nearness, dir: b.dir });

      // Proximity beeps while the ball approaches you.
      if (b.dir === 'down') {
        const interval = 440 - (1 - b.y) * 330; // slower far -> fast near
        if (ts - lastBeepRef.current >= interval) {
          const aligned = Math.round(b.laneFloat) === playerLaneRef.current;
          sounds.beep({ lane: b.laneFloat, nearness: 1 - b.y, aligned });
          lastBeepRef.current = ts;
        }
      }
      updateLock();

      // Boundary outcomes. The ball always travels the full court before a
      // point is awarded, so both directions are heard in sync. You lose only
      // if the ball reaches your baseline unreturned; Dobby loses only if it
      // reaches his.
      if (b.dir === 'down' && b.y <= 0) {
        resolvePoint('player');
      } else if (b.dir === 'up') {
        if (b.y >= BOT_ZONE && !botResolvedRef.current) {
          botAttempt();
        } else if (b.y >= 1 && botResolvedRef.current && b.botFailed) {
          resolvePoint('bot');
        }
      }
      paintBall();
    }

    rafRef.current = requestAnimationFrame(loop);
  }, [resolvePoint, updateLock]);

  const startLoop = useCallback(() => {
    lastTsRef.current = 0;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(loop);
  }, [loop]);

  function startGame() {
    sounds.unlock();
    const lvl = LEVELS[levelId] || LEVELS.easy;
    levelRef.current = lvl;
    playerScoreRef.current = START_CHANCES;
    botScoreRef.current = START_CHANCES;
    setPlayerScore(START_CHANCES);
    setBotScore(START_CHANCES);
    setPlayerLane(4);
    playerLaneRef.current = 4;
    botLaneRef.current = 4;
    setResult(null);
    persist('rallyLevel', levelId);
    setPhase('playing');
    phaseRef.current = 'playing';
    sounds.ambienceStart();
    startLoop();
    announce('Game on. You defend the bottom. Move with left and right arrows until you hear the steady lock tone, then press Up to hit as the beeps get fastest.');
    scheduleServe(900);
  }

  function backToSetup() {
    if (serveTimerRef.current) window.clearTimeout(serveTimerRef.current);
    ball.current.active = false;
    sounds.ballStop();
    sounds.lockOn(false);
    sounds.ambienceStop();
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    setPhase('setup');
    phaseRef.current = 'setup';
    setStatus('');
  }

  function reportState() {
    const b = ball.current;
    let text = `Score, you ${playerScoreRef.current}, Dobby ${botScoreRef.current}. Your bat is in lane ${playerLaneRef.current + 1} of ${LANES}.`;
    if (b.active && b.dir === 'down') {
      const diff = Math.round(b.laneFloat) - playerLaneRef.current;
      const where = diff === 0 ? 'in your lane'
        : `${Math.abs(diff)} ${Math.abs(diff) === 1 ? 'lane' : 'lanes'} to your ${diff < 0 ? 'left' : 'right'}`;
      const near = b.y < 0.35 ? 'very close' : (b.y < 0.7 ? 'on its way' : 'still high');
      text += ` The ball is ${where}, ${near}.`;
    } else if (b.active) {
      text += ' The ball is up with Dobby.';
    }
    announce(text);
  }

  const moveLane = useCallback((delta) => {
    setPlayerLane((prev) => {
      const next = Math.max(0, Math.min(LANES - 1, prev + delta));
      playerLaneRef.current = next;
      // A clear, pitched "tok" at the bat's position on every step; a duller
      // thud when you are already against a side wall.
      if (next !== prev) sounds.batMove(next, false);
      else sounds.batMove(prev, true);
      updateLock();
      return next;
    });
  }, [updateLock]);

  // Global keyboard handling while playing. Runs every render so closures stay
  // fresh; ignores typing in form fields.
  useEffect(() => {
    function onKey(e) {
      const tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key;
      if (phaseRef.current === 'playing') {
        if (k === 'ArrowLeft') { e.preventDefault(); moveLane(-1); }
        else if (k === 'ArrowRight') { e.preventDefault(); moveLane(1); }
        else if (k === 'ArrowUp' || k === ' ') { e.preventDefault(); swing(); }
        else if (k.toLowerCase() === 'm') { e.preventDefault(); reportState(); }
      } else if (phaseRef.current === 'over') {
        if (k === ' ' || k === 'Enter') { e.preventDefault(); startGame(); }
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  // Cleanup on unmount.
  useEffect(() => () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (serveTimerRef.current) window.clearTimeout(serveTimerRef.current);
    sounds.ballStop();
    sounds.lockOn(false);
    sounds.ambienceStop();
  }, []);

  // ---------- SETUP ----------
  if (phase === 'setup') {
    return (
      <div className={styles.game}>
        <p className={styles.instructions}>
          Sound Rally is a fast back-and-forth volley you play entirely by ear against Dobby. The
          court is split into eight lanes from left to right. You guard the bottom; Dobby guards the
          top. Dobby serves the ball toward you and you find it by sound: it is placed in 3D space,
          so a lane on your left really sounds on your left and a lane on your right sounds on your
          right, and each lane also has its own musical pitch, low on the left and rising to the
          right, so you can pinpoint the exact lane. The tone grows louder and brighter with
          quickening beeps as it nears. Slide your bat with the left and right arrow keys: each step
          plays a clear knock whose pitch tells you which lane your bat is in, low on the left and
          rising to the right, so you always know where you are. Line your bat up with the ball until
          you hear a steady lock tone &mdash; that means your bat is in the ball&rsquo;s lane &mdash;
          then press the up arrow to hit as the beeps become fastest. A clean hit sends it rocketing
          back to Dobby with a sharp knock.
        </p>
        <p className={styles.recommend}>
          <strong>Keys:</strong> left and right arrows move your bat; up arrow or space hits &mdash;
          you can swing as many times as you like as the ball comes in, so keep trying until you
          connect; press <strong>M</strong> any time to hear the score and where the ball is. If the
          ball gets past your bat to the bottom, you lose a chance; get it past Dobby at the top and
          he loses one. You each start with ten chances; the first down to zero loses. Watch out for
          pace balls that suddenly speed up and spin balls that drift across the lanes.
        </p>
        <p className={styles.recommend}>
          <strong>For the best experience</strong>, use headphones (the left-to-right sound is how
          you find the ball) and switch your screen reader to focus mode or pause its speech, since
          this game guides you with sound. In NVDA press the NVDA key plus S; in JAWS press Insert
          plus Space, then S.
        </p>

        {!supported && (
          <p className={`${styles.status} ${styles.statusError}`} role="alert">
            Your browser does not support the Web Audio API, so this game cannot make the sounds it
            needs to be played by ear. Please try a current version of Chrome, Edge, or Safari.
          </p>
        )}

        <div className={styles.panel}>
          <h2 className={styles.blockHeadingTop}>Your record</h2>
          <dl className={styles.metrics}>
            <div className={styles.metricRow}><dt>Wins</dt><dd>{record.wins}</dd></div>
            <div className={styles.metricRow}><dt>Losses</dt><dd>{record.losses}</dd></div>
          </dl>

          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Difficulty</legend>
            <div className={styles.controls} style={{ marginTop: 0 }}>
              {Object.entries(LEVELS).map(([id, lvl]) => (
                <label key={id} className={`${styles.option} ${levelId === id ? styles.optionSelected : ''}`}>
                  <input type="radio" name="rally-level" value={id} checked={levelId === id}
                    onChange={() => setLevelId(id)} />
                  <span>{lvl.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div style={{ marginTop: '1.25rem' }}>
            <button type="button" className="btn btn-primary" onClick={startGame} disabled={!supported}>
              Start rally
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---------- PLAYING / OVER ----------
  return (
    <div className={styles.game}>
      <p className={styles.politeLive} role="status" aria-live="assertive">{status}</p>

      <div className={styles.panel}>
        <div className={styles.scoreboard}>
          <div><span className={styles.scoreLabel}>You</span><span className={styles.scoreValue}>{playerScore}</span></div>
          <div><span className={styles.scoreLabel}>Dobby</span><span className={styles.scoreValue}>{botScore}</span></div>
          <div><span className={styles.scoreLabel}>Your lane</span><span className={styles.scoreValue}>{playerLane + 1} / {LANES}</span></div>
        </div>

        <div className={styles.rallyCourt} ref={boardRef} aria-hidden="true">
          <div className={styles.rallyBaselineTop} />
          <div className={styles.rallyBall} ref={ballDotRef} />
          <div
            className={styles.rallyBat}
            style={{ left: `${(playerLane / (LANES - 1)) * 100}%` }}
          />
        </div>

        <div className={styles.controls}>
          <button type="button" className="btn btn-outline" onClick={() => moveLane(-1)} aria-label="Move bat left">Left</button>
          <button type="button" className="btn btn-primary" onClick={swing} aria-label="Hit the ball">Hit</button>
          <button type="button" className="btn btn-outline" onClick={() => moveLane(1)} aria-label="Move bat right">Right</button>
          <button type="button" className="btn btn-outline" onClick={reportState}>Where is it? (M)</button>
        </div>

        <p className={styles.meta}>
          Left and right arrows move your bat; up arrow or space hits; M reports the score and the
          ball&rsquo;s position. Listen for the steady lock tone, then hit as the beeps get fastest.
        </p>

        {phase === 'over' && result && (
          <div className={styles.chessResult} role="alert">
            <p className={styles.scoreBig}>{result.playerWon ? 'You beat Dobby!' : 'Dobby wins this time.'}</p>
            <div className={styles.controls}>
              <button type="button" className="btn btn-primary" onClick={startGame}>Play again</button>
              <button type="button" className="btn btn-outline" onClick={backToSetup}>Settings</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
