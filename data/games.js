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
      'The classic hand cricket game, reimagined to be played entirely by ear. Win the toss, choose to bat or bowl, and pick a number from one to six each ball against Dobby, a mischievous and clever opponent who always gives you a proper contest. A lively commentary track in English or Hindi calls every run, wicket, and milestone aloud, wrapped in live crowd sound, with your own choice of voice and speed. Keyboard-first, screen-reader-first, and it remembers your wins.',
    tagline: 'Bat, bowl, and take on Dobby with live commentary',
    type: 'web',
  },
  {
    id: 'accessible-chess',
    title: 'Accessible Chess',
    description:
      'Chess you can play entirely by ear against Dobby, the computer. The board is a grid you move around with the arrow keys, and every square announces the piece on it and its coordinate, like "White pawn, e2". Pick up a piece to hear its legal moves, play it, and hear every capture, check, and result called aloud. Choose your colour, set Dobby\u2019s strength, and play from the keyboard alone.',
    tagline: 'Play chess by ear, one square at a time',
    type: 'web',
  },
];

export function getGame(id) {
  return games.find((game) => game.id === id);
}
