'use client';

import { useEffect, useState } from 'react';

interface ScoreEntry {
  name: string;
  score: number;
  date: string;
}

export default function Leaderboard() {
  const [scores, setScores] = useState<ScoreEntry[]>([]);

  useEffect(() => {
    const localData = localStorage.getItem('quiz_leaderboard');
    if (localData) setScores(JSON.parse(localData));
  }, []);

  const getIQ = (score: number) => {
    if (score === 5) return '🧠 Genius (IQ 150+)';
    if (score === 4) return '💡 Smart (IQ 120+)';
    if (score === 3) return '🙂 Above Avg (IQ 100+)';
    if (score === 2) return '😐 Average (IQ 90)';
    return '🤔 Try Again';
  };

  const getComment = (score: number) => {
    if (score === 5) return '🔥 Brilliant! You nailed it all!';
    if (score === 4) return '👏 Great job, almost perfect!';
    if (score === 3) return '👍 Good effort! Keep practicing.';
    if (score === 2) return '🙂 Not bad. Brush up a bit more!';
    return '💪 Don’t give up. Try again!';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-950 p-6 text-white flex flex-col items-center">
      <h1 className="text-4xl font-bold text-yellow-400 mb-6">🏆 Leaderboard</h1>
      {scores.length === 0 ? (
        <p className="text-purple-300">No scores saved yet.</p>
      ) : (
        <div className="w-full max-w-2xl bg-gray-900/80 rounded-xl shadow-xl p-6 border border-purple-700">
          <table className="w-full text-left">
            <thead>
              <tr className="text-yellow-300 border-b border-purple-600">
                <th className="py-2">#</th>
                <th className="py-2">Name</th>
                <th className="py-2">Score</th>
                <th className="py-2">IQ Level</th>
                <th className="py-2">Comment</th>
                <th className="py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {scores
                .sort((a, b) => b.score - a.score)
                .slice(0, 10)
                .map((entry, i) => (
                  <tr key={i} className="border-b border-gray-700 hover:bg-purple-800/20">
                    <td className="py-2 text-purple-300">{i + 1}</td>
                    <td className="py-2">{entry.name}</td>
                    <td className="py-2 text-green-400 font-bold">{entry.score}</td>
                    <td className="py-2 text-sm">{getIQ(entry.score)}</td>
                    <td className="py-2 text-xs text-yellow-300 italic">{getComment(entry.score)}</td>
                    <td className="py-2 text-xs text-purple-400">{entry.date}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
      <button
        className="mt-8 bg-yellow-400 text-black font-bold px-6 py-2 rounded-full hover:bg-yellow-500 transition"
        onClick={() => (window.location.href = '/')}
      >
        ⬅️ Back to Home
      </button>
    </div>
  );
}
