// A compact, self-contained chess opponent for the accessible chess game.
//
// It uses chess.js purely for move generation and board state, and adds a small
// alpha-beta (negamax) search with a material + piece-square-table evaluation.
// This keeps everything client-side and static-export friendly: no engine
// binary, no web worker, no server. Depth 2-3 is plenty for a friendly bot and
// stays responsive in the browser.

import { Chess } from 'chess.js';

const VALUE = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 20000 };
const MATE = 1000000;

// Piece-square tables (midgame), written from White's point of view with index
// 0 = a1 ... 63 = h8 (rank 1 first). Black mirrors vertically (index ^ 56).
// Adapted from Tomasz Michniewski's "Simplified Evaluation Function".
const PST = {
  p: [
    0, 0, 0, 0, 0, 0, 0, 0,
    5, 10, 10, -20, -20, 10, 10, 5,
    5, -5, -10, 0, 0, -10, -5, 5,
    0, 0, 0, 20, 20, 0, 0, 0,
    5, 5, 10, 25, 25, 10, 5, 5,
    10, 10, 20, 30, 30, 20, 10, 10,
    50, 50, 50, 50, 50, 50, 50, 50,
    0, 0, 0, 0, 0, 0, 0, 0,
  ],
  n: [
    -50, -40, -30, -30, -30, -30, -40, -50,
    -40, -20, 0, 5, 5, 0, -20, -40,
    -30, 5, 10, 15, 15, 10, 5, -30,
    -30, 0, 15, 20, 20, 15, 0, -30,
    -30, 5, 15, 20, 20, 15, 5, -30,
    -30, 0, 10, 15, 15, 10, 0, -30,
    -40, -20, 0, 0, 0, 0, -20, -40,
    -50, -40, -30, -30, -30, -30, -40, -50,
  ],
  b: [
    -20, -10, -10, -10, -10, -10, -10, -20,
    -10, 5, 0, 0, 0, 0, 5, -10,
    -10, 10, 10, 10, 10, 10, 10, -10,
    -10, 0, 10, 10, 10, 10, 0, -10,
    -10, 5, 5, 10, 10, 5, 5, -10,
    -10, 0, 5, 10, 10, 5, 0, -10,
    -10, 0, 0, 0, 0, 0, 0, -10,
    -20, -10, -10, -10, -10, -10, -10, -20,
  ],
  r: [
    0, 0, 0, 5, 5, 0, 0, 0,
    -5, 0, 0, 0, 0, 0, 0, -5,
    -5, 0, 0, 0, 0, 0, 0, -5,
    -5, 0, 0, 0, 0, 0, 0, -5,
    -5, 0, 0, 0, 0, 0, 0, -5,
    -5, 0, 0, 0, 0, 0, 0, -5,
    5, 10, 10, 10, 10, 10, 10, 5,
    0, 0, 0, 0, 0, 0, 0, 0,
  ],
  q: [
    -20, -10, -10, -5, -5, -10, -10, -20,
    -10, 0, 5, 0, 0, 0, 0, -10,
    -10, 5, 5, 5, 5, 5, 0, -10,
    0, 0, 5, 5, 5, 5, 0, -5,
    -5, 0, 5, 5, 5, 5, 0, -5,
    -10, 0, 5, 5, 5, 5, 0, -10,
    -10, 0, 0, 0, 0, 0, 0, -10,
    -20, -10, -10, -5, -5, -10, -10, -20,
  ],
  k: [
    20, 30, 10, 0, 0, 10, 30, 20,
    20, 20, 0, 0, 0, 0, 20, 20,
    -10, -20, -20, -20, -20, -20, -20, -10,
    -20, -30, -30, -40, -40, -30, -30, -20,
    -30, -40, -40, -50, -50, -40, -40, -30,
    -30, -40, -40, -50, -50, -40, -40, -30,
    -30, -40, -40, -50, -50, -40, -40, -30,
    -30, -40, -40, -50, -50, -40, -40, -30,
  ],
};

// Convert an algebraic square (e.g. "e2") to a 0..63 index with a1 = 0.
function squareIndex(square) {
  const file = square.charCodeAt(0) - 97; // a..h -> 0..7
  const rank = parseInt(square[1], 10) - 1; // 1..8 -> 0..7
  return rank * 8 + file;
}

// Static evaluation, positive = good for White.
function evaluate(chess) {
  const board = chess.board();
  let score = 0;
  for (let r = 0; r < 8; r += 1) {
    for (let f = 0; f < 8; f += 1) {
      const piece = board[r][f];
      if (!piece) continue;
      const idx = squareIndex(piece.square);
      const base = VALUE[piece.type];
      const pst = PST[piece.type];
      if (piece.color === 'w') {
        score += base + pst[idx];
      } else {
        score -= base + pst[idx ^ 56];
      }
    }
  }
  return score;
}

// Most-valuable-victim / least-valuable-attacker style ordering key: try
// captures (especially of big pieces) first for better alpha-beta pruning.
function orderKey(move) {
  if (!move.captured) return 0;
  return 10 * VALUE[move.captured] - VALUE[move.piece];
}

function negamax(chess, depth, alpha, beta) {
  if (chess.isCheckmate()) return -MATE - depth; // prefer faster mates
  if (chess.isGameOver()) return 0; // stalemate / draw
  if (depth === 0) {
    const e = evaluate(chess);
    return chess.turn() === 'w' ? e : -e;
  }
  const moves = chess.moves({ verbose: true }).sort((a, b) => orderKey(b) - orderKey(a));
  let best = -Infinity;
  let a = alpha;
  for (let i = 0; i < moves.length; i += 1) {
    chess.move(moves[i]);
    const score = -negamax(chess, depth - 1, -beta, -a);
    chess.undo();
    if (score > best) best = score;
    if (best > a) a = best;
    if (a >= beta) break;
  }
  return best;
}

// Choose a move for the side to move from the given FEN. Returns a verbose move
// object ({ from, to, promotion, san, ... }) or null if the game is over.
// A small random tie-break among near-best moves keeps games varied.
export function chooseMove(fen, depth = 3) {
  const chess = new Chess(fen);
  const moves = chess.moves({ verbose: true });
  if (moves.length === 0) return null;
  moves.sort((a, b) => orderKey(b) - orderKey(a));

  let bestScore = -Infinity;
  const scored = [];
  for (let i = 0; i < moves.length; i += 1) {
    chess.move(moves[i]);
    const score = -negamax(chess, depth - 1, -Infinity, Infinity);
    chess.undo();
    scored.push({ move: moves[i], score });
    if (score > bestScore) bestScore = score;
  }
  // Pick randomly among moves within a small window of the best score.
  const window = 15;
  const top = scored.filter((s) => s.score >= bestScore - window);
  const chosen = top[Math.floor(Math.random() * top.length)];
  return chosen.move;
}

export default chooseMove;
