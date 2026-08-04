// Web Audio sound engine for Sound Rally, the by-ear volley game.
//
// Everything is synthesized live (no binary assets). The whole point of the
// game is that a blind player can locate and time the ball purely by sound, so
// the audio design IS the gameplay. This version uses true 3D spatial audio:
//
//   * A single HRTF PannerNode places the ball in 3D space around the listener,
//     which gives far sharper left/right localisation than simple stereo pan.
//     The ball's LANE maps to a fixed left-right ANGLE (kept constant as it
//     nears, so a given lane always sounds like the same direction), and its
//     DISTANCE maps to how far in front it is (so it naturally gets louder and
//     closer as it approaches).
//   * As a second, redundant cue for the exact lane, the ball's continuous tone
//     is PITCHED per lane, low on the far left up to high on the far right, so
//     you can also just "hear" the lane as a musical note. Spin balls glide the
//     pitch as they drift.
//   * Proximity is reinforced by the tone brightening and a gentle metronome of
//     beeps that speeds up as the ball nears, so you know when to swing.
//   * The tone is warm and smooth (soft triangle voices with a slow shimmer),
//     not a harsh insect buzz, and every change is ramped, never switched hard.

let ctx = null;
let master = null;

function getCtx() {
  if (typeof window === 'undefined') return null;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  if (!ctx) {
    try { ctx = new AC(); } catch (e) { return null; }
    master = ctx.createGain();
    master.gain.value = 0.9;
    const comp = ctx.createDynamicsCompressor();
    master.connect(comp);
    comp.connect(ctx.destination);
    // Place the listener at the origin, facing forward (-z), up is +y.
    const l = ctx.listener;
    if (l.positionX) {
      l.positionX.value = 0; l.positionY.value = 0; l.positionZ.value = 0;
      if (l.forwardX) {
        l.forwardX.value = 0; l.forwardY.value = 0; l.forwardZ.value = -1;
        l.upX.value = 0; l.upY.value = 1; l.upZ.value = 0;
      }
    } else if (l.setPosition) {
      l.setPosition(0, 0, 0);
      l.setOrientation(0, 0, -1, 0, 1, 0);
    }
  }
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  return ctx;
}

// Eight pleasant ascending notes (a major-pentatonic run) — one per lane, so
// the lane can be heard as a pitch as well as a direction.
const LANE_NOTES = [196.0, 220.0, 261.6, 293.7, 329.6, 392.0, 440.0, 523.3];
const NUM_LANES = LANE_NOTES.length;
const LAST_LANE = NUM_LANES - 1;
const MID_LANE = LAST_LANE / 2;

function laneToFreq(lane) {
  const clamped = Math.max(0, Math.min(LAST_LANE, lane));
  const lo = Math.floor(clamped);
  const hi = Math.min(LAST_LANE, lo + 1);
  const frac = clamped - lo;
  return LANE_NOTES[lo] * ((LANE_NOTES[hi] / LANE_NOTES[lo]) ** frac);
}

// Convert a lane and nearness (0 far .. 1 at the baseline) into a 3D position.
// The horizontal angle depends only on the lane (x scales with depth) so a lane
// keeps the same direction as it approaches; depth shrinks as it nears so it
// gets closer and louder.
function lanePos(lane, nearness) {
  const laneNorm = (lane - MID_LANE) / MID_LANE; // -1 .. 1
  const depth = 1.4 + (1 - Math.max(0, Math.min(1, nearness))) * 8.6; // 1.4 near .. 10 far
  return { x: laneNorm * depth * 0.95, y: 0, z: -depth };
}

function makePanner(ac) {
  const p = ac.createPanner();
  p.panningModel = 'HRTF';
  p.distanceModel = 'inverse';
  p.refDistance = 1.5;
  p.rolloffFactor = 0.5;
  p.maxDistance = 30;
  return p;
}

function setPos(p, x, y, z, ac, smooth) {
  if (p.positionX) {
    if (smooth) {
      const t = ac.currentTime;
      p.positionX.setTargetAtTime(x, t, smooth);
      p.positionY.setTargetAtTime(y, t, smooth);
      p.positionZ.setTargetAtTime(z, t, smooth);
    } else {
      p.positionX.value = x; p.positionY.value = y; p.positionZ.value = z;
    }
  } else if (p.setPosition) {
    p.setPosition(x, y, z);
  }
}

// A short enveloped tone, optionally placed at a 3D position.
function playTone(ac, opts) {
  const {
    freq, type = 'sine', start = 0, dur = 0.15, gain = 0.2,
    attack = 0.008, freqEnd, pos, dest,
  } = opts;
  const t0 = ac.currentTime + start;
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (freqEnd) osc.frequency.exponentialRampToValueAtTime(Math.max(1, freqEnd), t0 + dur);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(gain, t0 + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g);
  let out = g;
  if (pos) {
    const p = makePanner(ac);
    setPos(p, pos.x, pos.y, pos.z, ac, 0);
    g.connect(p);
    out = p;
  }
  out.connect(dest || master);
  osc.start(t0);
  osc.stop(t0 + dur + 0.05);
}

function playNoise(ac, opts) {
  const {
    start = 0, dur = 0.3, gain = 0.2, type = 'bandpass', freq = 1200,
    q = 0.7, attack = 0.2, pos, dest,
  } = opts;
  const t0 = ac.currentTime + start;
  const frames = Math.max(1, Math.floor(ac.sampleRate * dur));
  const buf = ac.createBuffer(1, frames, ac.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < frames; i += 1) data[i] = Math.random() * 2 - 1;
  const src = ac.createBufferSource();
  src.buffer = buf;
  const filt = ac.createBiquadFilter();
  filt.type = type;
  filt.frequency.value = freq;
  filt.Q.value = q;
  const g = ac.createGain();
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.linearRampToValueAtTime(gain, t0 + dur * attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  src.connect(filt);
  filt.connect(g);
  let out = g;
  if (pos) {
    const p = makePanner(ac);
    setPos(p, pos.x, pos.y, pos.z, ac, 0);
    g.connect(p);
    out = p;
  }
  out.connect(dest || master);
  src.start(t0);
  src.stop(t0 + dur + 0.05);
}

// ---------------------------------------------------------------------------
// The continuous ball tone. Two soft detuned triangle voices, a gentle shimmer,
// a low-pass that opens as the ball nears, all through a moving HRTF panner.
// ---------------------------------------------------------------------------
let voice = null;

function ballStart() {
  const ac = getCtx();
  if (!ac || voice) return;
  const osc1 = ac.createOscillator();
  const osc2 = ac.createOscillator();
  osc1.type = 'triangle';
  osc2.type = 'triangle';
  osc1.frequency.value = 330;
  osc2.frequency.value = 331.6; // slight detune for warmth
  const filt = ac.createBiquadFilter();
  filt.type = 'lowpass';
  filt.frequency.value = 900;
  filt.Q.value = 0.7;
  const gain = ac.createGain();
  gain.gain.value = 0.0001;
  // Gentle, slow shimmer (not an insect rattle).
  const lfo = ac.createOscillator();
  lfo.type = 'sine';
  lfo.frequency.value = 5;
  const lfoGain = ac.createGain();
  lfoGain.gain.value = 0.18;
  lfo.connect(lfoGain);
  lfoGain.connect(gain.gain);
  const panner = makePanner(ac);
  setPos(panner, 0, 0, -10, ac, 0);
  osc1.connect(filt);
  osc2.connect(filt);
  filt.connect(gain);
  gain.connect(panner);
  panner.connect(master);
  osc1.start();
  osc2.start();
  lfo.start();
  gain.gain.setTargetAtTime(0.16, ac.currentTime, 0.15); // smooth fade-in
  voice = { osc1, osc2, filt, gain, lfo, panner };
}

function ballUpdate({ lane = 4.5, nearness = 0, dir = 'down' }) {
  const ac = getCtx();
  if (!voice || !ac) return;
  const n = Math.max(0, Math.min(1, nearness));
  const t = ac.currentTime;
  const freq = laneToFreq(lane);
  voice.osc1.frequency.setTargetAtTime(freq, t, 0.06);
  voice.osc2.frequency.setTargetAtTime(freq * 1.005, t, 0.06);
  // Brighten as it nears.
  voice.filt.frequency.setTargetAtTime(500 + n * 2600, t, 0.08);
  // Approaching is fuller; receding toward Dobby stays clearly audible so you
  // can hear the ball travel all the way up, with the 3D distance doing the
  // "moving away" work.
  const target = dir === 'down' ? 0.1 + n * 0.14 : 0.09 + n * 0.11;
  voice.gain.gain.setTargetAtTime(target, t, 0.08);
  const p = lanePos(lane, n);
  setPos(voice.panner, p.x, p.y, p.z, ac, 0.05);
}

function ballStop() {
  if (!voice) return;
  const v = voice;
  voice = null;
  const ac = ctx;
  if (ac) {
    v.gain.gain.setTargetAtTime(0.0001, ac.currentTime, 0.06);
    const stopAt = ac.currentTime + 0.2;
    try { v.osc1.stop(stopAt); v.osc2.stop(stopAt); v.lfo.stop(stopAt); } catch (e) { /* ignore */ }
  } else {
    try { v.osc1.stop(); v.osc2.stop(); v.lfo.stop(); } catch (e) { /* ignore */ }
  }
}

// A soft timing beep, placed at the ball so it reinforces the direction. A
// touch brighter when your bat is lined up with the ball's lane.
function beep({ lane = 4.5, nearness = 0, aligned = false }) {
  const ac = getCtx();
  if (!ac) return;
  const n = Math.max(0, Math.min(1, nearness));
  const freq = aligned ? 720 : 480;
  playTone(ac, {
    freq, type: 'sine', dur: 0.05, gain: aligned ? 0.12 : 0.07,
    pos: lanePos(lane, n),
  });
}

// ---------------------------------------------------------------------------
// The lock-on hum: a soft, smoothly fading tone that plays only while your bat
// is in the ball's lane, so you know you are ready to swing.
// ---------------------------------------------------------------------------
let lock = null;

function lockOn(on) {
  const ac = getCtx();
  if (!ac) return;
  if (on && !lock) {
    const osc = ac.createOscillator();
    const osc2 = ac.createOscillator();
    osc.type = 'sine';
    osc2.type = 'sine';
    osc.frequency.value = 528;
    osc2.frequency.value = 792; // a fifth above, a "ready" chord
    const g = ac.createGain();
    g.gain.value = 0.0001;
    osc.connect(g);
    osc2.connect(g);
    g.connect(master);
    osc.start();
    osc2.start();
    g.gain.setTargetAtTime(0.05, ac.currentTime, 0.06); // smooth in
    lock = { osc, osc2, g };
  } else if (!on && lock) {
    const l = lock;
    lock = null;
    l.g.gain.setTargetAtTime(0.0001, ac.currentTime, 0.06); // smooth out
    const stopAt = ac.currentTime + 0.2;
    try { l.osc.stop(stopAt); l.osc2.stop(stopAt); } catch (e) { /* ignore */ }
  }
}

// Your bat striking the ball: a bright, punchy, clearly audible knock at the
// ball's position, so a clean hit feels solid.
function takPlayer(lane) {
  const ac = getCtx();
  if (!ac) return;
  const pos = lanePos(lane, 1);
  playTone(ac, { freq: 600, type: 'triangle', dur: 0.15, gain: 0.42, freqEnd: 260, pos });
  playTone(ac, { freq: 900, type: 'sine', dur: 0.08, gain: 0.18, pos });
  playNoise(ac, { dur: 0.05, gain: 0.2, type: 'highpass', freq: 3200, attack: 0.05, pos });
}

// The bat's own position cue: a crisp, fairly loud wooden "tok" placed exactly
// where your bat is (bottom of the court, panned to its lane) and pitched to
// that lane's note, so every left/right step tells you clearly where you are.
// A duller thud plays when you are already against a side wall.
function batMove(lane, blocked) {
  const ac = getCtx();
  if (!ac) return;
  const pos = lanePos(lane, 1);
  if (blocked) {
    playTone(ac, { freq: 150, type: 'sine', dur: 0.12, gain: 0.24, freqEnd: 90, pos });
    return;
  }
  const freq = laneToFreq(lane);
  playTone(ac, { freq, type: 'triangle', dur: 0.12, gain: 0.36, freqEnd: freq * 0.6, pos });
  playTone(ac, { freq: freq * 2, type: 'square', dur: 0.04, gain: 0.1, pos });
}

// Dobby striking the ball back: a clear, deeper "pock" from far in front, so it
// is obvious the ball is coming back at you.
function takBot(lane) {
  const ac = getCtx();
  if (!ac) return;
  const pos = lanePos(lane, 0); // far away, up at Dobby's end
  playTone(ac, { freq: 300, type: 'square', dur: 0.16, gain: 0.34, freqEnd: 150, pos });
  playTone(ac, { freq: 200, type: 'sine', dur: 0.22, gain: 0.2, freqEnd: 120, pos });
  playNoise(ac, { dur: 0.08, gain: 0.14, type: 'bandpass', freq: 1600, q: 0.8, attack: 0.05, pos });
}

// A swing that hit nothing.
function whiff(lane) {
  const ac = getCtx();
  if (!ac) return;
  playNoise(ac, { dur: 0.3, gain: 0.14, type: 'bandpass', freq: 900, q: 0.5, attack: 0.15, pos: lanePos(lane, 1) });
}

// A mistimed clip off the edge of the bat.
function edge(lane) {
  const ac = getCtx();
  if (!ac) return;
  const pos = lanePos(lane, 1);
  playTone(ac, { freq: 760, type: 'square', dur: 0.07, gain: 0.14, pos });
  playNoise(ac, { dur: 0.12, gain: 0.1, type: 'bandpass', freq: 2400, q: 1.2, attack: 0.05, pos });
}

// A ball beating a bat drops past and thumps into the wall/stumps behind that
// player. `side` is 'near' (your end, behind the listener) or 'far' (Dobby's
// end, far in front).
function fallAndCrash(lane, side = 'near') {
  const ac = getCtx();
  if (!ac) return;
  const from = lanePos(lane, side === 'near' ? 1 : 0);
  // Falling whistle as it drops past that end.
  playTone(ac, { freq: 620, type: 'sine', dur: 0.34, gain: 0.16, freqEnd: 150, pos: from });
  // Wall/stumps impact: just behind you for a near miss, far in front for a far
  // miss at Dobby's end.
  const laneX = (lane - MID_LANE) / MID_LANE;
  const impact = side === 'near'
    ? { x: laneX * 1.2, y: 0, z: 1.5 }
    : { x: laneX * 6, y: 0, z: -9 };
  playTone(ac, { start: 0.3, freq: 150, type: 'sine', dur: 0.34, gain: 0.3, freqEnd: 55, pos: impact });
  playNoise(ac, { start: 0.3, dur: 0.22, gain: 0.17, type: 'lowpass', freq: 500, attack: 0.05, pos: impact });
}

// The ball racing away after a clean winner past Dobby.
function whoosh(lane) {
  const ac = getCtx();
  if (!ac) return;
  const pos = lanePos(lane, 0);
  playNoise(ac, { dur: 0.6, gain: 0.16, type: 'bandpass', freq: 1400, q: 0.5, attack: 0.35, pos });
  playTone(ac, { freq: 300, type: 'sine', dur: 0.6, gain: 0.08, freqEnd: 1200, pos });
}

// A pace-change signal: a quick upward zip so you can react to the surge.
function paceCue(lane) {
  const ac = getCtx();
  if (!ac) return;
  playTone(ac, { freq: 380, type: 'sawtooth', dur: 0.2, gain: 0.13, freqEnd: 1000, pos: lanePos(lane, 0.5) });
}

// Rising three-blip serve countdown (centred).
function serveCue() {
  const ac = getCtx();
  if (!ac) return;
  [523, 659, 784].forEach((f, i) => playTone(ac, { start: i * 0.16, freq: f, type: 'sine', dur: 0.14, gain: 0.16 }));
}

function pointWon() {
  const ac = getCtx();
  if (!ac) return;
  [659, 880].forEach((f, i) => playTone(ac, { start: i * 0.1, freq: f, type: 'triangle', dur: 0.22, gain: 0.2 }));
}

function pointLost() {
  const ac = getCtx();
  if (!ac) return;
  [392, 294].forEach((f, i) => playTone(ac, { start: i * 0.12, freq: f, type: 'sine', dur: 0.28, gain: 0.18 }));
}

function win() {
  const ac = getCtx();
  if (!ac) return;
  [523, 659, 784, 1046].forEach((f, i) => playTone(ac, { start: i * 0.13, freq: f, type: 'triangle', dur: 0.5, gain: 0.22 }));
  playNoise(ac, { dur: 1.1, gain: 0.12, type: 'bandpass', freq: 900, q: 0.5, attack: 0.4 });
}

function lose() {
  const ac = getCtx();
  if (!ac) return;
  [440, 392, 330, 262].forEach((f, i) => playTone(ac, { start: i * 0.16, freq: f, type: 'sine', dur: 0.5, gain: 0.18 }));
}

// ---------------------------------------------------------------------------
// A soft ambient bed under the rally.
// ---------------------------------------------------------------------------
let amb = null;

function ambienceStart() {
  const ac = getCtx();
  if (!ac || amb) return;
  const dur = 2;
  const frames = Math.floor(ac.sampleRate * dur);
  const buf = ac.createBuffer(1, frames, ac.sampleRate);
  const data = buf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < frames; i += 1) {
    const white = Math.random() * 2 - 1;
    last = (last + 0.02 * white) / 1.02;
    data[i] = last * 3;
  }
  const src = ac.createBufferSource();
  src.buffer = buf;
  src.loop = true;
  const filt = ac.createBiquadFilter();
  filt.type = 'lowpass';
  filt.frequency.value = 420;
  const g = ac.createGain();
  g.gain.value = 0.0001;
  src.connect(filt);
  filt.connect(g);
  g.connect(master);
  src.start();
  g.gain.exponentialRampToValueAtTime(0.028, ac.currentTime + 1.4);
  amb = { src, g, base: 0.028 };
}

function ambienceStop() {
  if (!amb) return;
  const a = amb;
  amb = null;
  const ac = ctx;
  if (ac) {
    a.g.gain.setTargetAtTime(0.0001, ac.currentTime, 0.3);
    try { a.src.stop(ac.currentTime + 0.6); } catch (e) { /* ignore */ }
  } else {
    try { a.src.stop(); } catch (e) { /* ignore */ }
  }
}

function unlock() { getCtx(); }

const sounds = {
  unlock,
  ballStart,
  ballUpdate,
  ballStop,
  beep,
  lockOn,
  takPlayer,
  batMove,
  takBot,
  whiff,
  edge,
  fallAndCrash,
  whoosh,
  paceCue,
  serveCue,
  pointWon,
  pointLost,
  win,
  lose,
  ambienceStart,
  ambienceStop,
};

export default sounds;
