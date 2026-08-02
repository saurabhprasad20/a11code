export const games = [
  {
    id: 'typing-test',
    title: 'Accessible Typing Test',
    description:
      'A dictation-based typing test built for screen-reader users. Choose Easy, Medium, or Hard; the app reads words and sentences aloud while you type them, timed for one, two, or five minutes. Pick your own voice and speed, repeat any item on demand, and get your words-per-minute, accuracy, and a personal best at the end.',
    tagline: 'Type what you hear, against the clock',
    type: 'web',
  },
];

export function getGame(id) {
  return games.find((game) => game.id === id);
}
