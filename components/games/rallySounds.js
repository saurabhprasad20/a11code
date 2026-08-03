// Web Audio sound engine for Sound Rally, the by-ear two-way volley game.
//
// Everything is synthesized live (no binary assets), matching the rest of the
// site. The whole point of this game is that a blind player can locate and time
// the ball purely by sound, so the audio design is the gameplay:
//
//   * The ball's horizontal lane is conveyed by STEREO PAN (far left .. far
//     right across the ten lanes).
//   * Its proximity to you is conveyed by a continuous "charrr" buzz that rises
//     in pitch and volume as it approaches, plus discrete beeps that speed up
//     like a reversing sensor. Hit when the beeps are fastest.
//   * A steady "lock-on" hum tells you your bat is in the same lane as the ball.
//   * Distinct "tak" sounds mark your hit and Dobby's hit; whiffs, edges and a
//     wall thud mark the ways a point ends.
//
// A shared master gain + compressor keeps overlapping effects from clipping.

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
  }
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  return ctx;
}

function clampPan(p) {
  return Math.max(-1, Math.min(1, p));
}

// A panned enveloped oscillator blip.
function tone(ac, opts) {
  const {
    freq, type = 'sine', start = 0, dur = 0.15, gain = 0.2,
    attack = 0.006, freqEnd, pan = 0, dest,
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
  let out = g;
  if (ac.createStereoPanner) {
    const p = ac.createStereoPanner();
    p.pan.value = clampPan(pan);
    g.connect(p);
    out = p;
  }
  osc.connect(g);
  out.connect(dest || master);
  osc.start(t0);
  osc.stop(t0 + dur + 0.05);
}

function noiseBurst(ac, opts) {
  const {
    start = 0, dur = 0.3, gain = 0.2, type = 'bandpass', freq = 1200,
    q = 0.7, attack = 0.2, pan = 0, dest,
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
  let out = g;
  if (ac.createStereoPanner) {
    const p = ac.createStereoPanner();
    p.pan.value = clampPan(pan);
    g.connect(p);
    out = p;
  }
  src.connect(filt);
  filt.connect(g);
  out.connect(dest || master);
  src.start(t0);
  src.stop(t0 + dur + 0.05);
}

// ---------------------------------------------------------------------------
// The continuous ball buzz. One sawtooth through a bandpass, a gain and a
// stereo panner, updated smoothly every frame while the ball is in flight.
// ---------------------------------------------------------------------------
let buzz = null;

function buzzStart() {
  const ac = getCtx();
  if (!ac || buzz) return;
  const osc = ac.createOscillator();
  osc.type = 'sawtooth';
  osc.frequency.value = 220;
  const filt = ac.createBiquadFilter();
  filt.type = 'bandpass';
  filt.frequency.value = 800;
  filt.Q.value = 4;
  // A gentle amplitude tremolo gives the rolling "charrr" texture.
  const lfo = ac.createOscillator();
  lfo.type = 'square';
  lfo.frequency.value = 26;
  const lfoGain = ac.createGain();
  lfoGain.gain.value = 0.5;
  const gain = ac.createGain();
  gain.gain.value = 0.0001;
  lfo.connect(lfoGain);
  lfoGain.connect(gain.gain);
  let out = gain;
  let panner = null;
  if (ac.createStereoPanner) {
    panner = ac.createStereoPanner();
    gain.connect(panner);
    out = panner;
  }
  osc.connect(filt);
  filt.connect(gain);
  out.connect(master);
  osc.start();
  lfo.start();
  buzz = { osc, filt, gain, lfo, panner, base: 0.5 };
}

function buzzUpdate({ pan = 0, nearness = 0, moving = 'down' }) {
  const ac = getCtx();
  if (!buzz || !ac) return;
  const n = Math.max(0, Math.min(1, nearness));
  // Approaching (down) is brighter and louder; receding (up) is quieter.
  const freq = 200 + n * 620;
  const filtFreq = 500 + n * 2200;
  const gainTarget = moving === 'down' ? 0.05 + n * 0.14 : 0.04 + (1 - n) * 0.03;
  const lfoRate = 20 + n * 34; // faster rattle as it nears
  const t = ac.currentTime;
  buzz.osc.frequency.setTargetAtTime(freq, t, 0.04);
  buzz.filt.frequency.setTargetAtTime(filtFreq, t, 0.05);
  buzz.gain.gain.setTargetAtTime(buzz.ducked ? gainTarget * 0.4 : gainTarget, t, 0.04);
  buzz.lfo.frequency.setTargetAtTime(lfoRate, t, 0.05);
  buzz.base = gainTarget;
  if (buzz.panner) buzz.panner.pan.setTargetAtTime(clampPan(pan), t, 0.03);
}

function buzzStop() {
  if (!buzz) return;
  const b = buzz;
  buzz = null;
  const ac = ctx;
  if (ac) {
    b.gain.gain.setTargetAtTime(0.0001, ac.currentTime, 0.05);
    try { b.osc.stop(ac.currentTime + 0.15); } catch (e) { /* already stopped */ }
    try { b.lfo.stop(ac.currentTime + 0.15); } catch (e) { /* already stopped */ }
  } else {
    try { b.osc.stop(); b.lfo.stop(); } catch (e) { /* ignore */ }
  }
}

// A discrete proximity beep. Pleasant, higher pitch when your bat is aligned
// with the ball's lane; duller when it is not.
function beep({ pan = 0, nearness = 0, aligned = false }) {
  const ac = getCtx();
  if (!ac) return;
  const n = Math.max(0, Math.min(1, nearness));
  const freq = aligned ? 560 + n * 340 : 300 + n * 160;
  tone(ac, { freq, type: aligned ? 'sine' : 'triangle', dur: 0.06, gain: aligned ? 0.12 : 0.08, pan });
}

// ---------------------------------------------------------------------------
// The steady lock-on hum: a soft continuous tone that plays only while your bat
// is in the ball's lane, so you know you are ready to swing.
// ---------------------------------------------------------------------------
let lock = null;

function lockOn(on) {
  const ac = getCtx();
  if (!ac) return;
  if (on && !lock) {
    const osc = ac.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = 330;
    const g = ac.createGain();
    g.gain.value = 0.0001;
    osc.connect(g);
    g.connect(master);
    osc.start();
    g.gain.setTargetAtTime(0.05, ac.currentTime, 0.03);
    lock = { osc, g };
  } else if (!on && lock) {
    const l = lock;
    lock = null;
    l.g.gain.setTargetAtTime(0.0001, ac.currentTime, 0.03);
    try { l.osc.stop(ac.currentTime + 0.1); } catch (e) { /* ignore */ }
  }
}

// The crack of bat on ball. Higher, brighter for you; lower for Dobby.
function tak({ pan = 0, who = 'player' } = {}) {
  const ac = getCtx();
  if (!ac) return;
  const base = who === 'player' ? 520 : 300;
  tone(ac, { freq: base, type: 'triangle', dur: 0.12, gain: 0.32, freqEnd: base * 0.5, pan });
  noiseBurst(ac, { dur: 0.05, gain: 0.16, type: 'highpass', freq: 3000, attack: 0.05, pan });
}

// A swing that hit nothing.
function whiff(pan = 0) {
  const ac = getCtx();
  if (!ac) return;
  noiseBurst(ac, { dur: 0.28, gain: 0.14, type: 'bandpass', freq: 900, q: 0.6, attack: 0.15, pan });
}

// A mistimed clip off the edge of the bat.
function edge(pan = 0) {
  const ac = getCtx();
  if (!ac) return;
  tone(ac, { freq: 700, type: 'square', dur: 0.07, gain: 0.14, pan });
  noiseBurst(ac, { dur: 0.12, gain: 0.1, type: 'bandpass', freq: 2200, q: 1.2, attack: 0.05, pan });
}

// The ball beating the bat and thumping the back wall.
function thud(pan = 0) {
  const ac = getCtx();
  if (!ac) return;
  tone(ac, { freq: 150, type: 'sine', dur: 0.32, gain: 0.3, freqEnd: 55, pan });
  noiseBurst(ac, { dur: 0.18, gain: 0.14, type: 'lowpass', freq: 400, attack: 0.06, pan });
}

// A whoosh of the ball racing away after a clean winner.
function whoosh(pan = 0) {
  const ac = getCtx();
  if (!ac) return;
  noiseBurst(ac, { dur: 0.6, gain: 0.16, type: 'bandpass', freq: 1400, q: 0.5, attack: 0.35, pan });
  tone(ac, { freq: 300, type: 'sine', dur: 0.6, gain: 0.08, freqEnd: 1200, pan });
}

// A pace-change signal: a sudden upward zip so the player can react.
function paceCue(pan = 0) {
  const ac = getCtx();
  if (!ac) return;
  tone(ac, { freq: 400, type: 'sawtooth', dur: 0.18, gain: 0.14, freqEnd: 1100, pan });
}

// Rising three-blip serve countdown.
function serveCue() {
  const ac = getCtx();
  if (!ac) return;
  [523, 659, 784].forEach((f, i) => tone(ac, { start: i * 0.16, freq: f, type: 'sine', dur: 0.14, gain: 0.16 }));
}

// Short stings when a point is decided.
function pointWon() {
  const ac = getCtx();
  if (!ac) return;
  [659, 880].forEach((f, i) => tone(ac, { start: i * 0.1, freq: f, type: 'triangle', dur: 0.22, gain: 0.2 }));
}

function pointLost() {
  const ac = getCtx();
  if (!ac) return;
  [392, 294].forEach((f, i) => tone(ac, { start: i * 0.12, freq: f, type: 'sine', dur: 0.28, gain: 0.18 }));
}

function win() {
  const ac = getCtx();
  if (!ac) return;
  [523, 659, 784, 1046].forEach((f, i) => tone(ac, { start: i * 0.13, freq: f, type: 'triangle', dur: 0.5, gain: 0.22 }));
  noiseBurst(ac, { dur: 1.1, gain: 0.12, type: 'bandpass', freq: 900, q: 0.5, attack: 0.4 });
}

function lose() {
  const ac = getCtx();
  if (!ac) return;
  [440, 392, 330, 262].forEach((f, i) => tone(ac, { start: i * 0.16, freq: f, type: 'sine', dur: 0.5, gain: 0.18 }));
}

// ---------------------------------------------------------------------------
// A soft ambient bed that plays through a rally and ducks under spoken lines.
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
  filt.frequency.value = 480;
  const g = ac.createGain();
  g.gain.value = 0.0001;
  src.connect(filt);
  filt.connect(g);
  g.connect(master);
  src.start();
  g.gain.exponentialRampToValueAtTime(0.035, ac.currentTime + 1.2);
  amb = { src, g, base: 0.035 };
}

function ambienceDuck(on) {
  const ac = getCtx();
  if (!amb || !ac) return;
  amb.g.gain.setTargetAtTime(on ? amb.base * 0.3 : amb.base, ac.currentTime, 0.08);
  if (buzz) buzz.ducked = on;
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
  buzzStart,
  buzzUpdate,
  buzzStop,
  beep,
  lockOn,
  tak,
  whiff,
  edge,
  thud,
  whoosh,
  paceCue,
  serveCue,
  pointWon,
  pointLost,
  win,
  lose,
  ambienceStart,
  ambienceDuck,
  ambienceStop,
};

export default sounds;
