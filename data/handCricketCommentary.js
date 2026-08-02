// Commentary engine for Hand Cricket.
//
// Lines are grouped by event. The picker avoids repeating a line until the
// pool for that event has been mostly used, so commentary stays fresh across a
// match and across matches. Tone deliberately mixes TV commentary, radio
// commentary, cricket slang, funny, dramatic, and emotional registers.
//
// Add more lines freely; the engine needs no other changes.

export const commentary = {
  matchStart: [
    'Welcome to the middle. The players are ready and so are we.',
    'Here we go, a fresh contest under the lights.',
    'The stage is set, the crowd is buzzing, let the cricket begin.',
    'Game on. May the sharper mind and the steadier nerve win.',
    'A hush falls over the ground as the first ball approaches.',
    'Two competitors, one pitch, and a whole lot of drama ahead.',
    'The anticipation is electric. Let battle commence.',
    'Bats are tapping, hands are ready. This should be fun.',
  ],
  tossWin: [
    'You have won the toss. The first decision of the day is yours.',
    'The coin falls your way. A good omen to start with.',
    'You call it right! The advantage is yours already.',
    'Toss won. Now make it count.',
    'Fortune smiles on you at the toss.',
  ],
  tossLose: [
    'You lose the toss, and the opponent will bat first.',
    'The coin betrays you this time. The bot takes first strike.',
    'No luck at the toss. You are into the field first.',
    'The opponent wins the toss and chooses to bat.',
    'Toss goes against you. Time to make an early breakthrough.',
  ],
  battingStart: [
    'You stride out to bat. Middle and leg, and away we go.',
    'Pads on, gloves ready, you take guard.',
    'Your innings begins. Watch the ball, trust your hands.',
    'You are on strike. Show them what you have got.',
    'Time to build an innings. Bat first, panic never.',
  ],
  bowlingStart: [
    'Ball in hand, you steam in to bowl.',
    'You are into the attack. Hunt for that wicket.',
    'Time to bowl. One good ball changes everything.',
    'You mark your run up. The batter waits.',
    'Bowling now. Keep it tight and force the error.',
  ],
  run1: [
    'Just a single. Tap and run.',
    'One run, quietly taken.',
    'Pushed away for a comfortable single.',
    'A gentle nudge and they cross for one.',
    'Single taken, the scoreboard ticks over.',
    'Soft hands, easy single.',
    'One more to the tally. No fuss.',
    'A quick single keeps the strike rotating.',
    'Nudged into the gap for one.',
    'They sneak a single. Sharp running.',
    'One run. Every little helps.',
    'Worked away off the pads for a single.',
  ],
  run2: [
    'Two runs, good running between the wickets.',
    'Placed into the gap and they come back for the second.',
    'A brace of runs there, well judged.',
    'Two more. They turned one into two with hustle.',
    'Driven into the outfield, they scamper two.',
    'Good running! Two to the total.',
    'Clipped away for a couple.',
    'They push hard for the second and make it.',
    'Two runs, the fielder had no chance to stop the second.',
    'A well run two. The legs are working today.',
    'Into the gap, back for two.',
    'Couple of runs, smartly taken.',
  ],
  run3: [
    'Three runs! Excellent placement and running.',
    'They pierce the gap and pick up a valuable three.',
    'Driven hard, and they run three all the way.',
    'Three to the tally, that is proper cricket.',
    'Split the field, ran three. Superb.',
    'A rare and precious three runs.',
    'Deep into the outfield, and they come back for three.',
    'Three runs, the legs earning every one of them.',
    'Beautifully placed for three.',
    'They turn a good shot into three with sharp running.',
  ],
  run4: [
    'Four! Beautifully struck through the gap.',
    'That races away to the boundary. Four runs.',
    'Crack! Straight to the fence for four.',
    'Timed to perfection, the rope stops it. Four.',
    'A glorious boundary. The crowd loves it.',
    'Four runs, the fielder never moved.',
    'Threaded between the fielders for four.',
    'What a shot! That is all along the ground for four.',
    'The boundary boards take a beating. Four more.',
    'Elegant and effective. Four to the total.',
    'Pierced the field like a needle. Four.',
    'That is sublime. Four runs, and a smile all round.',
    'Punished! The bad ball goes for four.',
    'Silky timing, and the ball kisses the boundary.',
    'Four! The scoreboard operator is getting busy.',
  ],
  run5: [
    'Five runs! An overthrow turns a single into five.',
    'It is a no-ball and they run the extras. Five to the total.',
    'Chaos in the field! A misfield gifts them five.',
    'The throw misses the stumps and they run five in all.',
    'All run five! No boundary, just relentless running.',
    'Five! The fielders collide and the batters cash in.',
    'Overthrows! One becomes five in a flash.',
    'A wild return flies away and they pick up five.',
    'Comedy in the field, five runs the reward.',
    'Butterfingers in the deep, and it is five runs.',
    'Five! The keeper let that one through and they ran hard.',
    'A fumble, a fling, a miss, and five runs result.',
  ],
  run6: [
    'Six! That has gone into the crowd.',
    'Enormous! That disappeared into the night sky.',
    'Clean strike, and that is gone miles. Six runs.',
    'The bowler will not want to remember that one. Six.',
    'Maximum! Right out of the middle of the bat.',
    'That is huge. Six runs and the crowd is on its feet.',
    'Bang! Deposited over the ropes for six.',
    'Launched! The ball needs a passport for that one.',
    'Six more. That is contemptuous hitting.',
    'Into orbit! A mighty blow for six.',
    'The roof, if there was one, would be in danger. Six.',
    'Smashed! Six runs and the bowler holds his head.',
    'A monster hit. That is out of the ground.',
    'Timing plus power equals six. Spectacular.',
    'That is a flat, fierce six. No fielder in the county stops that.',
  ],
  out: [
    'He is gone! Timber!',
    'Out! Straight back to the pavilion.',
    'A massive breakthrough! The wicket falls.',
    'Got him! What a crucial moment.',
    'Bowled him! The numbers matched and the innings is over.',
    'Out! The bowler roars in delight.',
    'That is the end of the innings. Clean as you like.',
    'Wicket! The pressure told in the end.',
    'Gone! The stumps are shattered.',
    'Out! A golden moment for the bowler.',
    'Caught in the trap! The batter walks.',
    'The finger goes up, the batter goes off. Out.',
    'Big wicket at a big moment. Out!',
    'That is plumb. No doubt about it. Out.',
    'The innings ends there. A fine piece of bowling.',
  ],
  fifty: [
    'Fifty up! A superb half century, take a bow.',
    'Raise the bat, that is a well made fifty.',
    'A classy fifty. The innings is really humming now.',
    'Half century! Built with patience and flair.',
    'Fifty runs, and the crowd rises to applaud.',
    'A milestone reached. Fifty of the highest quality.',
  ],
  inningsBreak: [
    'That wraps up the innings. A target has been set.',
    'Innings over. Now the chase begins.',
    'The first innings is done. Time to turn the game around.',
    'Target on the board. The pressure shifts.',
    'End of the innings. The equation is now clear.',
  ],
  chasePressure: [
    'The required runs are shrinking. Nerves on both sides.',
    'Squeaky bum time, as they say. The chase is alive.',
    'Every run matters now. The tension is real.',
    'This is where matches are won and lost.',
    'The pressure valve is tightening. Hold your nerve.',
  ],
  win: [
    'You have won the match! Absolutely brilliant.',
    'Victory is yours! A performance to be proud of.',
    'You have done it! Chase completed in style.',
    'Game, set, and match to you. Superb cricket.',
    'A famous win! The celebrations begin.',
    'You held your nerve and got over the line. Champion.',
    'Winner! That was a masterclass.',
    'The match is yours. Take the applause.',
    'You have sealed it! What a finish.',
    'Triumph! You outplayed the opposition today.',
  ],
  lose: [
    'You have lost this one. It happens to the best.',
    'Defeat this time, but there is always the next match.',
    'The opponent edges it. Dust yourself off and go again.',
    'Not your day, but the fight was there.',
    'You fall just short. Learn, reset, return.',
    'The match slips away. Chin up, champion.',
    'A loss to log, and lessons to take from it.',
    'The bot takes the honours today. Your turn will come.',
    'So close, yet the win eludes you this time.',
    'Beaten, but not broken. Come back stronger.',
  ],
  tie: [
    'It is a tie! You could not separate them. Incredible.',
    'Scores level! An absolute thriller ends dead even.',
    'A tie! Neither side deserved to lose that one.',
    'Unbelievable! The match finishes all square.',
    'A tie for the ages. What a contest.',
    'Level pegging to the last. It is a tie!',
  ],
  closeFinish: [
    'Down to the wire! What a nerve jangling finish.',
    'A last gasp finish. The heart could not take much more.',
    'That went right to the final ball. Breathtaking.',
    'A photo finish if ever there was one.',
    'The tightest of margins. Sport at its very best.',
  ],
};

// Returns a picker for the given event that avoids repeating a line until most
// of the pool has been shown.
export function createCommentator() {
  const recent = {};
  return function pick(event) {
    const pool = commentary[event];
    if (!pool || pool.length === 0) return '';
    if (!recent[event]) recent[event] = [];
    const used = recent[event];
    let choices = pool.filter((line) => !used.includes(line));
    if (choices.length === 0) {
      used.length = 0;
      choices = pool;
    }
    const line = choices[Math.floor(Math.random() * choices.length)];
    used.push(line);
    return line;
  };
}
