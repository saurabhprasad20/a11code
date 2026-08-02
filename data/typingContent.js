// Prompt banks for the accessible typing test. Each level dictates plain words
// or sentences: no digits and only light punctuation, because natural
// text-to-speech does not announce punctuation and reads numerals as words,
// which would be unfair to type from audio. Difficulty comes from length and
// vocabulary, not from guessing punctuation.

export const typingLevels = {
  easy: {
    id: 'easy',
    label: 'Easy',
    durationSeconds: 60,
    description:
      'One minute. Single common words are dictated one at a time. A gentle warm-up.',
    unit: 'word',
  },
  medium: {
    id: 'medium',
    label: 'Medium',
    durationSeconds: 120,
    description:
      'Two minutes. Short everyday sentences of about five to eight words are dictated.',
    unit: 'sentence',
  },
  hard: {
    id: 'hard',
    label: 'Hard',
    durationSeconds: 300,
    description:
      'Five minutes. Longer full sentences with richer vocabulary are dictated.',
    unit: 'sentence',
  },
};

// ---------------------------------------------------------------------------
// Easy level: a broad bank of common, everyday words (no digits).
// ---------------------------------------------------------------------------
const easyWords = [
  'time', 'people', 'water', 'sound', 'place', 'music', 'light', 'story',
  'paper', 'friend', 'garden', 'window', 'letter', 'market', 'summer', 'winter',
  'spring', 'autumn', 'school', 'family', 'travel', 'coffee', 'morning', 'evening',
  'picture', 'kitchen', 'journey', 'teacher', 'student', 'science', 'reason', 'answer',
  'question', 'moment', 'bridge', 'forest', 'island', 'mountain', 'river', 'ocean',
  'planet', 'flower', 'orange', 'yellow', 'purple', 'silver', 'golden', 'gentle',
  'bright', 'quiet', 'happy', 'brave', 'clever', 'honest', 'simple', 'strong',
  'careful', 'patient', 'kindness', 'courage', 'wisdom', 'freedom', 'balance', 'wonder',
  'harvest', 'weather', 'thunder', 'rainbow', 'shadow', 'candle', 'mirror', 'basket',
  'blanket', 'pillow', 'cushion', 'ladder', 'hammer', 'pencil', 'crayon', 'notebook',
  'library', 'museum', 'theatre', 'concert', 'painting', 'drawing', 'melody', 'rhythm',
  'guitar', 'violin', 'trumpet', 'whistle', 'engine', 'wheel', 'anchor', 'harbour',
  'sailor', 'captain', 'farmer', 'baker', 'doctor', 'nurse', 'artist', 'writer',
  'singer', 'dancer', 'painter', 'builder', 'driver', 'pilot', 'soldier', 'hunter',
  'animal', 'rabbit', 'turtle', 'monkey', 'donkey', 'parrot', 'sparrow', 'eagle',
  'dolphin', 'kitten', 'puppy', 'spider', 'butterfly', 'honeybee', 'ladybird', 'squirrel',
  'apple', 'banana', 'cherry', 'lemon', 'mango', 'melon', 'peanut', 'walnut',
  'carrot', 'potato', 'tomato', 'onion', 'ginger', 'pepper', 'butter', 'cheese',
  'bread', 'honey', 'sugar', 'coconut', 'biscuit', 'pancake', 'noodle', 'pickle',
  'blue', 'green', 'brown', 'black', 'white', 'grey', 'pink', 'cream',
  'circle', 'square', 'triangle', 'diamond', 'pattern', 'texture', 'surface', 'corner',
  'centre', 'border', 'ceiling', 'doorway', 'hallway', 'stairway', 'balcony', 'rooftop',
  'pocket', 'button', 'zipper', 'collar', 'sleeve', 'jacket', 'sweater', 'sandal',
  'umbrella', 'raincoat', 'scarf', 'glove', 'helmet', 'goggles', 'compass', 'lantern',
  'whisper', 'giggle', 'laughter', 'promise', 'secret', 'memory', 'dream', 'idea',
  'effort', 'purpose', 'progress', 'practice', 'lesson', 'chapter', 'sentence', 'meaning',
  'value', 'measure', 'number', 'symbol', 'signal', 'message', 'reply', 'welcome',
  'midday', 'sunset', 'sunrise', 'moonlight', 'starlight', 'daylight', 'twilight', 'horizon',
  'meadow', 'valley', 'canyon', 'desert', 'jungle', 'glacier', 'volcano', 'waterfall',
  'sturdy', 'graceful', 'curious', 'joyful', 'peaceful', 'thankful', 'hopeful', 'cheerful',
];

// ---------------------------------------------------------------------------
// Sentence generator pools. Activities are location-neutral, past-tense verb
// phrases so they read naturally after any subject and before any ending.
// ---------------------------------------------------------------------------
const subjects = [
  'the teacher', 'the student', 'the young student', 'the old sailor',
  'the kind doctor', 'the tired traveller', 'the curious child', 'the quiet writer',
  'the cheerful painter', 'the gentle nurse', 'the busy farmer', 'the wise grandmother',
  'the little boy', 'the little girl', 'my closest friend', 'my new neighbour',
  'our music teacher', 'her younger brother', 'his older sister', 'the morning baker',
  'the local gardener', 'the ship captain', 'the train driver', 'the night guard',
  'the village elder', 'the honest merchant', 'the young poet', 'the patient tutor',
];

const activities = [
  'worked quietly', 'smiled warmly', 'laughed softly', 'spoke gently',
  'waited patiently', 'listened carefully', 'read an old book', 'told a funny story',
  'told an old tale', 'wrote a long letter', 'sang a soft song', 'hummed a quiet tune',
  'drew a small picture', 'packed a light bag', 'made a warm meal', 'baked some fresh bread',
  'planted a few seeds', 'watered the young plants', 'folded the clean clothes',
  'swept the wooden floor', 'watched the passing clouds', 'followed the winding path',
  'opened an old journal', 'closed the heavy book', 'learned a new word',
  'practised a short song', 'remembered a happy day', 'imagined a distant land',
  'shared a warm smile', 'counted the falling leaves', 'traced a careful line',
  'whispered a kind word', 'gathered the ripe fruit', 'lit a small candle',
];

const endings = [
  'in the morning', 'in the evening', 'in the afternoon', 'before sunrise',
  'before sunset', 'after lunch', 'after dinner', 'near the river',
  'by the quiet sea', 'under the tall trees', 'beside the calm lake', 'along the narrow path',
  'at the open window', 'in the small garden', 'on a cold day', 'on a warm evening',
  'on a rainy afternoon', 'on a bright morning', 'without a single word', 'with a gentle smile',
  'with a happy heart', 'for a little while', 'for a few quiet minutes', 'all through the day',
  'in the soft lamplight', 'as the rain fell', 'as the day began', 'while the kettle boiled',
];

// A handful of hand-written sentences per level, mixed in for extra flavour.
const curatedMedium = [
  'the sun rose slowly over the hills',
  'birds were singing in the tall trees',
  'a warm cup of tea on a cold day',
  'the children played in the open park',
  'fresh bread came out of the oven',
  'the river flowed under the old bridge',
  'music filled the crowded concert hall',
  'we shared a quiet meal together',
  'the city lights shone in the distance',
  'rain tapped softly on the window',
];

const curatedHard = [
  'the curious student asked a thoughtful question about the difficult experiment',
  'a good story can carry a reader to places they have never seen',
  'patience and practice slowly turn a beginner into a confident writer',
  'a quiet library is a wonderful place to think and to learn new things',
  'learning a new skill feels hard at first but becomes natural with time',
  'a warm meal and a kind word can brighten the darkest winter evening',
  'reading widely helps us understand people whose lives are different from our own',
  'small acts of kindness often matter far more than grand and costly gestures',
  'the old bridge had carried travellers across the wide river for many centuries',
  'she explained the idea so clearly that everyone in the room understood it at once',
];

function pick(pool) {
  return pool[Math.floor(Math.random() * pool.length)];
}

function makeMedium() {
  // subject + activity: a natural five to eight word sentence.
  return `${pick(subjects)} ${pick(activities)}`;
}

function makeHard() {
  // subject + activity + ending: a longer, richer sentence.
  return `${pick(subjects)} ${pick(activities)} ${pick(endings)}`;
}

function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Builds a shuffled queue for the level, long enough that no test runs out.
// Medium and hard queues are freshly generated each time from a very large
// combinational space plus a few curated sentences, so tests stay fresh.
export function buildQueue(levelId, minLength = 300) {
  if (levelId === 'easy') {
    const queue = [];
    while (queue.length < minLength) queue.push(...shuffle(easyWords));
    return queue;
  }

  const curated = levelId === 'hard' ? curatedHard : curatedMedium;
  const make = levelId === 'hard' ? makeHard : makeMedium;

  const seen = new Set();
  const queue = [];
  shuffle(curated).slice(0, 4).forEach((s) => {
    if (!seen.has(s)) { seen.add(s); queue.push(s); }
  });
  let guard = 0;
  while (queue.length < minLength && guard < minLength * 30) {
    guard += 1;
    const s = make();
    if (seen.has(s)) continue;
    seen.add(s);
    queue.push(s);
  }
  return shuffle(queue);
}

// Exposed for insight/testing: the size of the generated sentence space.
export const variety = {
  easyWords: easyWords.length,
  mediumCombinations: subjects.length * activities.length,
  hardCombinations: subjects.length * activities.length * endings.length,
};
