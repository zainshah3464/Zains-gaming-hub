'use client';

import { useEffect, useState } from 'react';

interface Entry {
  name: string;
  score: number;
  date: string;
}

export default function Leaderboard() {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("quiz_leaderboard");
    let data: Entry[] = [];

    if (stored) {
      data = JSON.parse(stored) as Entry[];
    }

    // Filter out accidental extra "ZAIN" entries
    const userEntries = data.filter(e => e.name.toLowerCase() !== "zain");

    // Sort normally and slice top 9
    const topEntries = userEntries.sort((a, b) => b.score - a.score).slice(0, 9);

    // Add permanent ZAIN at the top
    const final = [
      { name: "ZAIN", score: 5, date: "2025-06-24" },
      ...topEntries
    ];

    setEntries(final);
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

  const clearLeaderboard = () => {
    localStorage.removeItem("quiz_leaderboard");
    setEntries([
      { name: "ZAIN", score: 5, date: "2025-06-24" }
    ]);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black via-purple-950 to-black text-white px-4 py-8 flex items-center justify-center">
      <div className="w-full max-w-5xl bg-gray-900/90 border border-purple-700 rounded-xl shadow-2xl p-4 sm:p-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-yellow-400 mb-6">🏆 Leaderboard</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-purple-800 text-sm sm:text-base">
            <thead>
              <tr className="bg-purple-800 text-white">
                <th className="p-2 sm:p-3 text-left border-b border-purple-700">#</th>
                <th className="p-2 sm:p-3 text-left border-b border-purple-700">Name</th>
                <th className="p-2 sm:p-3 text-left border-b border-purple-700">Score</th>
                <th className="p-2 sm:p-3 text-left border-b border-purple-700 hidden sm:table-cell">IQ</th>
                <th className="p-2 sm:p-3 text-left border-b border-purple-700 hidden sm:table-cell">Comment</th>
                <th className="p-2 sm:p-3 text-left border-b border-purple-700">Date</th>
              </tr>
            </thead>
            <tbody>
              {entries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-purple-300">No leaderboard data yet.</td>
                </tr>
              ) : (
                entries.map((entry, index) => (
                  <tr
                    key={index}
                    className={`border-b border-gray-700 ${
                      index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'
                    }`}
                  >
                    <td className="p-2 sm:p-3 font-bold text-yellow-300">{index + 1}</td>
                    <td className={`p-2 sm:p-3 ${entry.name === "ZAIN" ? "text-blue-400 font-bold" : ""}`}>
                      {entry.name}
                      <div className="sm:hidden mt-1 text-xs text-purple-300">{getIQ(entry.score)}</div>
                      <div className="sm:hidden text-xs italic text-yellow-300">{getComment(entry.score)}</div>
                    </td>
                    <td className="p-2 sm:p-3 text-green-400 font-semibold">{entry.score}</td>
                    <td className="p-2 sm:p-3 text-purple-300 hidden sm:table-cell">{getIQ(entry.score)}</td>
                    <td className="p-2 sm:p-3 text-yellow-300 italic hidden sm:table-cell">{getComment(entry.score)}</td>
                    <td className="p-2 sm:p-3 text-purple-400 text-xs">{entry.date}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => (window.location.href = '/')}
            className="bg-yellow-400 text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-500 transition w-full sm:w-auto"
          >
            ⬅️ Back to Home
          </button>
          <button
            onClick={clearLeaderboard}
            className="bg-red-800 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-700 transition w-full sm:w-auto"
          >
            🧹 Clear Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
}