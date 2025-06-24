'use client';

import { useEffect, useState } from 'react';

const winCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

export default function TicTacToe() {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);
  const [mode, setMode] = useState<'HUMAN' | 'AI'>('AI');
  const [comment, setComment] = useState<string | null>(null);

  const speak = (text: string) => {
    const msg = new SpeechSynthesisUtterance(text);
    msg.rate = 1;
    speechSynthesis.cancel();
    speechSynthesis.speak(msg);
  };

  const checkWinner = (b: (string | null)[]) => {
    for (const [a, b1, c] of winCombos) {
      if (b[a] && b[a] === b[b1] && b[a] === b[c]) return b[a];
    }
    return b.includes(null) ? null : 'Draw';
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;
    if (mode === 'HUMAN') {
      const newBoard = [...board];
      newBoard[index] = isPlayerTurn ? '❌' : '⭕';
      setBoard(newBoard);
      setIsPlayerTurn(!isPlayerTurn);
    } else if (mode === 'AI' && isPlayerTurn) {
      const newBoard = [...board];
      newBoard[index] = '❌';
      setBoard(newBoard);
      setIsPlayerTurn(false);
    }
  };

  const aiSmartMove = () => {
    const bestMove = getBestMove(board, '⭕');
    if (bestMove !== -1) {
      const newBoard = [...board];
      newBoard[bestMove] = '⭕';
      setBoard(newBoard);
      setIsPlayerTurn(true);
    }
  };

  const getBestMove = (b: (string | null)[], player: string): number => {
    const opponent = player === '⭕' ? '❌' : '⭕';
    const winner = checkWinner(b);
    if (winner === player) return 10;
    if (winner === opponent) return -10;
    if (!b.includes(null)) return 0;

    const moves: { index: number, score: number }[] = [];

    b.forEach((cell, i) => {
      if (cell === null) {
        const newBoard = [...b];
        newBoard[i] = player;
        const score = getBestMove(newBoard, opponent);
        moves.push({ index: i, score: -score });
      }
    });

    const best = moves.reduce((acc, move) => (move.score > acc.score ? move : acc), { index: -1, score: -Infinity });
    return best.index;
  };

  useEffect(() => {
    const result = checkWinner(board);
    if (result && !winner) {
      setWinner(result);
      if (result === 'Draw') {
        speak("It's a draw! Try harder next time.");
        setComment('Not bad! But you can do better.');
      } else if (result === '❌') {
        speak("You win! You're smarter than the AI!");
        setComment('Smart play! Great win 😎');
      } else {
        speak("You lost! Even the AI beat you.");
        setComment('You were too slow, try again!');
      }
    } else if (mode === 'AI' && !isPlayerTurn && !result) {
      const timer = setTimeout(aiSmartMove, 500);
      return () => clearTimeout(timer);
    }
  }, [board, isPlayerTurn, winner]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setWinner(null);
    setComment(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black text-white flex flex-col items-center justify-center p-4 sm:p-6 font-mono">
      <h1 className="text-3xl sm:text-5xl font-bold text-yellow-400 mb-4 drop-shadow-lg text-center">
        🎮 Tic Tac Toe
      </h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          onClick={() => setMode('AI')}
          className={`px-4 py-2 rounded-full ${
            mode === 'AI' ? 'bg-yellow-400 text-black' : 'bg-gray-800'
          }`}
        >
          🤖 Human vs AI
        </button>
        <button
          onClick={() => setMode('HUMAN')}
          className={`px-4 py-2 rounded-full ${
            mode === 'HUMAN' ? 'bg-yellow-400 text-black' : 'bg-gray-800'
          }`}
        >
          👥 Human vs Human
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {board.map((cell, index) => (
          <button
            key={index}
            className="w-20 h-20 sm:w-24 sm:h-24 text-3xl sm:text-4xl bg-purple-700 border-2 sm:border-4 border-yellow-400 rounded-xl sm:rounded-2xl hover:scale-105 transition-transform shadow-md sm:shadow-lg"
            onClick={() => handleClick(index)}
            disabled={!!cell || !!winner}
          >
            {cell}
          </button>
        ))}
      </div>

      {winner && (
        <div className="mt-6 text-xl sm:text-2xl text-yellow-300 font-semibold text-center">
          {winner === 'Draw' ? "It's a Draw!" : `${winner} wins!`}
        </div>
      )}

      {comment && (
        <div className="text-pink-400 mt-2 text-center text-base sm:text-lg italic">{comment}</div>
      )}

      <button
        onClick={resetGame}
        className="mt-6 px-5 sm:px-6 py-2 bg-yellow-400 text-black font-bold rounded-full hover:bg-yellow-500 transition-all shadow-md"
      >
        🔁 Play Again
      </button>
    </div>
  );
}
