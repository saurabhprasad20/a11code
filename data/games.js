export const games = [
  {
    id: 'code-quiz',
    title: 'Code Quiz',
    description:
      'Test your programming knowledge with this accessible quiz. Questions cover Python, Java, and general programming concepts. Fully keyboard navigable with screen reader announcements for each question and result.',
    tagline: 'Programming knowledge quiz',
    type: 'web',
  },
  {
    id: 'number-riddle',
    title: 'Number Riddle',
    description:
      'A number guessing game where you use logic and hints to find the hidden number. The game announces whether each guess is too high, too low, or correct, and tracks how many tries you take. Great for building logical thinking.',
    tagline: 'Guess the hidden number',
    type: 'web',
  },
  {
    id: 'stem-explorer',
    title: 'STEM Explorer: A Text Adventure',
    description:
      'A text-based adventure where you solve science and maths puzzles to progress through the story. Navigate a research lab, answer questions, and make choices that shape your journey. Entirely text-based and fully accessible.',
    tagline: 'Solve puzzles, shape the story',
    type: 'web',
  },
  {
    id: 'typing-champion',
    title: 'Typing Champion',
    description:
      'Improve your typing speed and accuracy with this accessible typing practice. Your words-per-minute and accuracy are announced when you finish each passage. Perfect for building coding speed at the keyboard.',
    tagline: 'Practise typing speed and accuracy',
    type: 'web',
  },
  {
    id: 'audio-memory',
    title: 'Audio Memory Match',
    description:
      'A memory game that uses musical tones instead of images. Each tile plays a note; find the matching pairs using only your ears and the keyboard. Trains memory and concentration while being fully accessible.',
    tagline: 'Match pairs of tones by ear',
    type: 'web',
  },
];

export function getGame(id) {
  return games.find((game) => game.id === id);
}
