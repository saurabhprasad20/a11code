// Synthesized sound effects for Hand Cricket, built entirely with the Web Audio
// API so the site ships no binary audio assets. Every sound is generated live
// from oscillators and shaped noise, then routed through a shared master gain
// and a compressor to keep overlapping effects from clipping.
//
// These effects are meant to ride *under* the spoken commentary, so they are
// short, punchy, and mixed low. The game gates all of them behind the same
// "speak commentary" switch, so there is no separate on/off control here.

let ctx = null;
let master = null;

function getCtx() {
  if (typeof window === 'undefined') return null;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  if (!ctx) {
    try {
      ctx = new AC();
    } catch (e) {
      return null;
    }
    master = ctx.createGain();
    master.gain.value = 0.85;
    const comp = ctx.createDynamicsCompressor();
    master.connect(comp);
    comp.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  return ctx;
}

// A single enveloped oscillator "voice".
function tone(ac, opts) {
  const {
    freq,
    type = 'sine',
    start = 0,
    dur = 0.15,
    gain = 0.2,
    attack = 0.006,
    freqEnd,
    dest,
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
  g.connect(dest || master);
  osc.start(t0);
  osc.stop(t0 + dur + 0.05);
}

// A shaped burst of white noise, filtered to a colour. Used for the crowd roar
// and the clatter of stumps.
function noiseBurst(ac, opts) {
  const {
    start = 0,
    dur = 0.4,
    gain = 0.2,
    type = 'bandpass',
    freq = 1000,
    q = 0.7,
    attack = 0.3,
    dest,
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
  g.connect(dest || master);
  src.start(t0);
  src.stop(t0 + dur + 0.05);
}

// A rising swell of filtered noise: the roar of a crowd. Bigger for a six.
function crowd(ac, level) {
  const dur = level >= 6 ? 1.2 : level === 5 ? 1.05 : 0.9;
  const gain = level >= 6 ? 0.26 : level === 5 ? 0.22 : 0.2;
  noiseBurst(ac, { dur, gain, type: 'bandpass', freq: 850, q: 0.5, attack: 0.35 });
  noiseBurst(ac, { dur, gain: gain * 0.55, type: 'highpass', freq: 1600, attack: 0.4 });
}

// Percussive "knock" of bat on ball, pitched up as the runs increase so each of
// the six values has its own recognisable tap.
function runTap(n) {
  const ac = getCtx();
  if (!ac) return;
  const freqs = { 1: 200, 2: 245, 3: 290, 4: 345, 5: 400, 6: 460 };
  const f = freqs[n] || 280;
  tone(ac, { freq: f, type: 'triangle', dur: 0.16, gain: 0.3, freqEnd: f * 0.55 });
  tone(ac, { freq: f * 3, type: 'square', dur: 0.045, gain: 0.07 });
}

// The crowd erupts on a boundary (4, 5 or 6): the "haaaa" the user asked for.
function boundary(level) {
  const ac = getCtx();
  if (!ac) return;
  crowd(ac, level);
  if (level >= 6) {
    // A bright sparkle on top of the roar for the maximum.
    tone(ac, { start: 0.05, freq: 1046, type: 'sine', dur: 0.5, gain: 0.16 });
    tone(ac, { start: 0.14, freq: 1318, type: 'sine', dur: 0.45, gain: 0.13 });
  }
}

// Stumps rattle: a low thud, a metallic clatter and a sinking tone of dismay.
function wicket() {
  const ac = getCtx();
  if (!ac) return;
  tone(ac, { freq: 160, type: 'sine', dur: 0.35, gain: 0.3, freqEnd: 60 });
  noiseBurst(ac, { dur: 0.24, gain: 0.22, type: 'bandpass', freq: 2600, q: 0.8, attack: 0.05 });
  noiseBurst(ac, { start: 0.07, dur: 0.18, gain: 0.16, type: 'bandpass', freq: 1900, q: 0.9, attack: 0.05 });
  tone(ac, { start: 0.05, freq: 330, type: 'sawtooth', dur: 0.42, gain: 0.11, freqEnd: 110 });
}

// A bright, spinning metallic shimmer for the coin toss.
function coin() {
  const ac = getCtx();
  if (!ac) return;
  tone(ac, { freq: 1200, type: 'sine', dur: 0.5, gain: 0.14, freqEnd: 1900 });
  tone(ac, { start: 0.02, freq: 1650, type: 'sine', dur: 0.42, gain: 0.1, freqEnd: 2500 });
  noiseBurst(ac, { dur: 0.5, gain: 0.05, type: 'highpass', freq: 3200, attack: 0.5 });
}

// A short, uplifting fanfare that plays as the match opens, before commentary.
function welcome() {
  const ac = getCtx();
  if (!ac) return;
  const notes = [392, 523, 659, 784];
  notes.forEach((f, i) => tone(ac, { start: i * 0.14, freq: f, type: 'triangle', dur: 0.32, gain: 0.2 }));
  tone(ac, { start: 0.62, freq: 1046, type: 'sine', dur: 0.5, gain: 0.16 });
}

// A two-note chime marking a fifty.
function fifty() {
  const ac = getCtx();
  if (!ac) return;
  [659, 880].forEach((f, i) => tone(ac, { start: i * 0.12, freq: f, type: 'sine', dur: 0.4, gain: 0.2 }));
}

// A low, throbbing pulse of tension when the chase gets close.
function pressure() {
  const ac = getCtx();
  if (!ac) return;
  tone(ac, { freq: 115, type: 'sine', dur: 0.55, gain: 0.15, freqEnd: 92 });
  tone(ac, { start: 0.28, freq: 115, type: 'sine', dur: 0.5, gain: 0.13, freqEnd: 92 });
}

// Triumphant rising fanfare with a roar: the closing sound for a win.
function win() {
  const ac = getCtx();
  if (!ac) return;
  [523, 659, 784, 1046].forEach((f, i) =>
    tone(ac, { start: i * 0.13, freq: f, type: 'triangle', dur: 0.5, gain: 0.22 }));
  crowd(ac, 6);
}

// A gentle descending phrase: the closing sound for a loss.
function lose() {
  const ac = getCtx();
  if (!ac) return;
  [440, 392, 330, 262].forEach((f, i) =>
    tone(ac, { start: i * 0.16, freq: f, type: 'sine', dur: 0.5, gain: 0.18 }));
}

// A held, even two-note phrase for a tie.
function tie() {
  const ac = getCtx();
  if (!ac) return;
  [523, 523].forEach((f, i) =>
    tone(ac, { start: i * 0.2, freq: f, type: 'triangle', dur: 0.55, gain: 0.18 }));
}

// Prime/resume the audio context from within a user gesture (e.g. the Start
// button) so the first real effect is not swallowed by an autoplay policy.
function unlock() {
  getCtx();
}

const sounds = {
  unlock,
  runTap,
  boundary,
  wicket,
  coin,
  welcome,
  fifty,
  pressure,
  win,
  lose,
  tie,
};

export default sounds;
