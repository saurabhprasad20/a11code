// Dobby's brain — the "intelligence" behind the Hand Cricket opponent.
//
// There is deliberately only ONE difficulty: hard. Instead of picking numbers at
// random, Dobby *predicts* what you are about to play and acts on that
// prediction. It never peeks at your actual choice (both sides commit
// simultaneously); it forecasts your next number from the pattern of everything
// you have played so far, the way a sharp bowler reads a batter.
//
// How the prediction works — an ensemble of simple "experts", each of which
// guesses your next number a different way, blended by how well each has been
// doing (a lightweight multiplicative-weights / Hedge scheme):
//
//   * frequency   — the numbers you lean on overall
//   * markov-1    — what you tend to play after your last number
//   * markov-2    — what you tend to play after your last two numbers
//   * anti-repeat — humans rarely repeat the number they just played
//
// Your batting habits and your bowling habits are tracked separately (people
// think differently in each role), and a light long-term profile persists in
// localStorage, so the more you play, the better Dobby reads you.
//
// Given a forecast distribution over your next number, Dobby does one of two
// things:
//   * When Dobby BOWLS (you are batting) it tries to MATCH your predicted number
//     to take your wicket.
//   * When Dobby BATS (you are bowling) it tries to AVOID your predicted number
//     so it does not get out — and, among the safe numbers, leans toward big
//     runs.
//
// Crucially, Dobby never plays a fixed argmax (which would make it repeat one
// number and become trivially readable). Instead it turns its intent into a
// score for each number and SOFTMAX-SAMPLES from it, with a temperature tied to
// its confidence: a sharp, confident read makes it commit; a flat, uncertain
// read makes it spread out (near random). It also penalises repeating its own
// recent picks, so Dobby itself never falls into a pattern a human can exploit.
// The result is fair against a random player (~50%) yet increasingly hard to
// beat as it gathers a read on a patterned one.

const NUMS = [1, 2, 3, 4, 5, 6];
const SMOOTH = 0.6; // Laplace smoothing so unseen numbers keep a small chance.
const ETA = 0.9; // Learning rate for the expert weights.
const PROFILE_KEY = 'hcDobbyProfile';

function emptyCounts() {
  return { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
}

function normalize(weights) {
  const total = NUMS.reduce((s, n) => s + weights[n], 0) || 1;
  const out = {};
  NUMS.forEach((n) => { out[n] = weights[n] / total; });
  return out;
}

function uniform() {
  const out = {};
  NUMS.forEach((n) => { out[n] = 1 / 6; });
  return out;
}

// Confidence of a forecast in [0,1]: 0 when perfectly flat (no read on the
// player), 1 when all the mass is on a single number.
function confidence(dist) {
  const peak = Math.max(...NUMS.map((n) => dist[n]));
  return Math.max(0, (peak - 1 / 6) / (1 - 1 / 6));
}

// Softmax sample from a map of scores over 1..6 at a given temperature. Low
// temperature commits to the best score; high temperature spreads out toward
// uniform. This replaces any fixed argmax so Dobby is never deterministic.
function softmaxSample(scores, temp) {
  const t = Math.max(0.05, temp);
  const vals = NUMS.map((n) => scores[n] / t);
  const m = Math.max(...vals);
  const exps = vals.map((v) => Math.exp(v - m));
  const sum = exps.reduce((a, b) => a + b, 0) || 1;
  let r = Math.random() * sum;
  for (let i = 0; i < NUMS.length; i += 1) {
    r -= exps[i];
    if (r <= 0) return NUMS[i];
  }
  return NUMS[NUMS.length - 1];
}

// Penalty for repeating Dobby's own recent picks, so Dobby does not fall into a
// readable pattern of its own (which is exactly how a human exploits a bot).
function selfRepeatPenalty(recent, n) {
  const len = recent.length;
  if (len === 0) return 0;
  let pen = 0;
  if (recent[len - 1] === n) pen += 1;
  if (len >= 2 && recent[len - 2] === n) pen += 0.5;
  if (len >= 3 && recent[len - 3] === n) pen += 0.25;
  return pen;
}

// A model of one stream of numbers (e.g. everything you play while batting).
// It holds the raw statistics and produces a blended forecast of the next value.
function createModel(prior) {
  const seq = [];
  const freq = prior ? { ...emptyCounts(), ...prior } : emptyCounts();
  const trans1 = {}; // last -> counts
  const trans2 = {}; // "a,b" -> counts
  // Ensemble weights, one per expert. They drift toward whichever expert has
  // been predicting this particular player best.
  const w = { freq: 1, m1: 1, m2: 1, anti: 1 };
  let lastExpertDists = null; // cached per-expert forecasts, for weight updates.

  function freqExpert() {
    const weights = {};
    NUMS.forEach((n) => { weights[n] = freq[n] + SMOOTH; });
    return normalize(weights);
  }

  function markovExpert(order) {
    if (seq.length < order) return null;
    const table = order === 1 ? trans1 : trans2;
    const key = order === 1
      ? String(seq[seq.length - 1])
      : `${seq[seq.length - 2]},${seq[seq.length - 1]}`;
    const counts = table[key];
    if (!counts) return null;
    const total = NUMS.reduce((s, n) => s + counts[n], 0);
    if (total === 0) return null;
    const weights = {};
    NUMS.forEach((n) => { weights[n] = counts[n] + SMOOTH; });
    return normalize(weights);
  }

  function antiRepeatExpert() {
    const last = seq[seq.length - 1];
    const weights = {};
    NUMS.forEach((n) => {
      let base = freq[n] + SMOOTH;
      if (last != null && n === last) base *= 0.25; // people avoid immediate repeats
      weights[n] = base;
    });
    return normalize(weights);
  }

  // Blend all available experts into a single forecast, weighted by how well
  // each has done so far.
  function forecast() {
    const experts = {
      freq: freqExpert(),
      m1: markovExpert(1),
      m2: markovExpert(2),
      anti: antiRepeatExpert(),
    };
    lastExpertDists = experts;

    const blended = {};
    NUMS.forEach((n) => { blended[n] = 0; });
    let wsum = 0;
    Object.keys(experts).forEach((k) => {
      const dist = experts[k];
      if (!dist) return;
      wsum += w[k];
      NUMS.forEach((n) => { blended[n] += w[k] * dist[n]; });
    });
    if (wsum === 0) return uniform();
    NUMS.forEach((n) => { blended[n] /= wsum; });
    return blended;
  }

  // After the true value is known, reward the experts that expected it and
  // fold the value into the statistics.
  function observe(value) {
    if (lastExpertDists) {
      Object.keys(w).forEach((k) => {
        const dist = lastExpertDists[k];
        if (!dist) return;
        const loss = 1 - dist[value]; // low loss when the expert liked this value
        w[k] *= Math.exp(-ETA * loss);
      });
      // Keep the weights from collapsing to zero or exploding.
      const maxW = Math.max(...Object.values(w));
      if (maxW > 0) Object.keys(w).forEach((k) => { w[k] /= maxW; });
      lastExpertDists = null;
    }

    if (seq.length >= 1) {
      const k1 = String(seq[seq.length - 1]);
      trans1[k1] = trans1[k1] || emptyCounts();
      trans1[k1][value] += 1;
    }
    if (seq.length >= 2) {
      const k2 = `${seq[seq.length - 2]},${seq[seq.length - 1]}`;
      trans2[k2] = trans2[k2] || emptyCounts();
      trans2[k2][value] += 1;
    }
    freq[value] += 1;
    seq.push(value);
  }

  return { forecast, observe, freq };
}

function loadProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw);
    return p && typeof p === 'object' ? p : null;
  } catch (e) {
    return null;
  }
}

function saveProfile(profile) {
  try { localStorage.setItem(PROFILE_KEY, JSON.stringify(profile)); } catch (e) { /* ignore */ }
}

// Public factory. Create one Dobby per match.
export function createDobby() {
  const profile = loadProfile() || { bat: emptyCounts(), bowl: emptyCounts() };
  // Long-term counts seed the models as a light prior (scaled down so a single
  // match can still move the needle).
  const scale = (counts) => {
    const out = emptyCounts();
    NUMS.forEach((n) => { out[n] = (counts[n] || 0) * 0.15; });
    return out;
  };
  const batModel = createModel(scale(profile.bat)); // your picks while batting
  const bowlModel = createModel(scale(profile.bowl)); // your picks while bowling
  // Dobby's own recent picks, so it can avoid being predictable itself.
  const myBowls = [];
  const myBats = [];

  // Dobby bowls: you are batting, so forecast your batting pick and aim to match
  // it for the wicket. It sharpens toward the prediction when it has a confident
  // read and spreads out (near random) when it does not, and it avoids repeating
  // its own recent deliveries so you cannot simply key off a pattern.
  function bowl() {
    const dist = batModel.forecast();
    const conf = confidence(dist);
    const scores = {};
    NUMS.forEach((n) => {
      // Want to bowl where you are likely to bat; discourage repeating our own
      // recent balls.
      scores[n] = dist[n] - 0.09 * selfRepeatPenalty(myBowls, n);
    });
    // Confident read -> low temperature (commit); flat read -> high temperature
    // (spread), so early balls are not a fixed number.
    const temp = 0.16 + (1 - conf) * 0.9;
    const pick = softmaxSample(scores, temp);
    myBowls.push(pick);
    if (myBowls.length > 8) myBowls.shift();
    return pick;
  }

  // Dobby bats: you are bowling, so forecast your bowling pick and steer away
  // from it while leaning toward higher scores, then sample so it is varied and
  // never a predictable, repeated number.
  function bat() {
    const dist = bowlModel.forecast(); // chance you bowl each number
    const conf = confidence(dist);
    const scores = {};
    NUMS.forEach((n) => {
      const safety = 1 - dist[n]; // chance you do NOT bowl this number
      // Safety dominates; a mild bonus for bigger runs; avoid our own repeats.
      scores[n] = 3.2 * safety + 0.14 * (n / 6) - 0.5 * selfRepeatPenalty(myBats, n);
    });
    // When your bowling is predictable, sharpen (dodge hard); when it is not,
    // stay varied rather than always defaulting to six.
    const temp = 0.5 + (1 - conf) * 0.6;
    const pick = softmaxSample(scores, temp);
    myBats.push(pick);
    if (myBats.length > 8) myBats.shift();
    return pick;
  }

  // Record the number you actually played, in the given role ('bat' | 'bowl').
  function record(role, value) {
    if (role === 'bat') batModel.observe(value);
    else bowlModel.observe(value);
    profile[role][value] = (profile[role][value] || 0) + 1;
    saveProfile(profile);
  }

  return { bowl, bat, record };
}

export default createDobby;
