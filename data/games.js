export const games = [
  {
    id: 'typing-test',
    title: 'Accessible Typing Test',
    description:
      'A dictation-based typing test built for screen-reader users. Choose Easy, Medium, or Hard; the app reads words and sentences aloud while you type them, timed for one, two, or five minutes. Pick your own voice and speed, repeat any item on demand, and get your words-per-minute, accuracy, and a personal best at the end.',
    tagline: 'Type what you hear, against the clock',
    type: 'web',
  },
  {
    id: 'hand-cricket',
    title: 'Hand Cricket',
    description:
      'The classic hand cricket game, reimagined to be played entirely by ear. Win the toss, choose to bat or bowl, and pick a number from one to six each ball against the bot. A lively commentary track calls every run, wicket, and milestone aloud, with your own choice of voice and speed. Keyboard-first, screen-reader-first, and it remembers your wins.',
    tagline: 'Bat, bowl, and beat the bot with live commentary',
    type: 'web',
  },
];

export function getGame(id) {
  return games.find((game) => game.id === id);
}
