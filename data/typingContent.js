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
      'Two minutes. Short everyday phrases of about five to eight words are dictated.',
    unit: 'phrase',
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

const easyWords = [
  'time', 'people', 'water', 'sound', 'place', 'music', 'light', 'story',
  'paper', 'friend', 'garden', 'window', 'letter', 'market', 'summer', 'winter',
  'school', 'family', 'travel', 'coffee', 'morning', 'evening', 'picture', 'kitchen',
  'journey', 'teacher', 'student', 'science', 'reason', 'answer', 'question', 'moment',
  'bridge', 'forest', 'island', 'mountain', 'river', 'ocean', 'planet', 'flower',
  'orange', 'yellow', 'purple', 'silver', 'golden', 'gentle', 'bright', 'quiet',
  'happy', 'brave', 'clever', 'honest', 'simple', 'strong', 'careful', 'patient',
];

const mediumPhrases = [
  'the sun rose over the hills',
  'she reads a book every night',
  'we walked along the quiet beach',
  'a warm cup of tea in winter',
  'the children played in the park',
  'birds were singing in the trees',
  'he wrote a letter to his friend',
  'the train arrived right on time',
  'fresh bread from the corner bakery',
  'they planted flowers in the garden',
  'the river flowed under the old bridge',
  'a gentle breeze moved through the room',
  'music filled the crowded hall',
  'the teacher explained the lesson slowly',
  'we shared a meal with our neighbours',
  'the city lights shone in the distance',
  'she painted the fence a bright blue',
  'the dog ran across the open field',
  'rain tapped softly on the window',
  'we watched the stars late at night',
  'the market was busy on saturday morning',
  'a kind word can change someone day',
  'the mountain path was steep but calm',
  'he learned to cook from his grandmother',
];

const hardSentences = [
  'the curious student asked a thoughtful question about the experiment',
  'a good story can carry a reader to places they have never seen',
  'patience and practice slowly turn a beginner into a confident writer',
  'the engineers worked together to solve a difficult and stubborn problem',
  'a quiet library is a wonderful place to think and learn new things',
  'the gentle rain fell steadily across the wide and open valley',
  'she believed that every person deserves a fair chance to succeed',
  'the ancient bridge had carried travellers across the river for centuries',
  'learning a new skill feels hard at first but becomes natural with time',
  'the scientist recorded her results carefully before sharing them with others',
  'a warm meal and a kind conversation can brighten the darkest evening',
  'the young musician practised the same piece until it sounded effortless',
  'curiosity is the spark that leads people toward remarkable discoveries',
  'the team celebrated together after finishing the long and demanding project',
  'a well written sentence can hold a great deal of meaning in few words',
  'the farmer watched the clouds gather and hoped for a season of good rain',
  'reading widely helps us understand people whose lives differ from our own',
  'the old clock in the hallway had measured the quiet hours for generations',
  'she explained the idea so clearly that everyone in the room understood it',
  'small acts of kindness often matter far more than grand and costly gestures',
];

const banks = {
  easy: easyWords,
  medium: mediumPhrases,
  hard: hardSentences,
};

// Returns a long shuffled queue for the level, repeating the bank if needed so
// a fast typist never runs out during a five-minute test.
export function buildQueue(levelId, minLength = 200) {
  const source = banks[levelId] || banks.easy;
  const queue = [];
  while (queue.length < minLength) {
    const shuffled = [...source];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    queue.push(...shuffled);
  }
  return queue;
}
