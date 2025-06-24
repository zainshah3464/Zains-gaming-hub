'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function HomeClient() {
  useEffect(() => {
    const msg = new SpeechSynthesisUtterance("Welcome to Zain’s Gaming Hub!");
    msg.rate = 1;
    speechSynthesis.cancel();
    speechSynthesis.speak(msg);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-purple-900 to-black text-white p-6">
      {/* Glowing Title */}
      <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-center text-shadow-glow">
        🎮 Zain’s Gaming Hub
      </h1>

      {/* Subtitle */}
      <p className="text-lg text-gray-300 text-center mb-12">
        Level up your reflexes. Challenge your mind. Own the leaderboard.
      </p>

<div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl w-full">
  {/* Reaction Game */}
  <Link href="/reaction" className="bg-black/50 border border-purple-600 hover:border-yellow-400 p-6 rounded-xl transition-all duration-300 hover:scale-105 hover:bg-purple-800 shadow-lg text-center">
    <h2 className="text-xl font-semibold text-yellow-300 mb-2">⚡ Reaction Speed Test</h2>
    <p className="text-sm text-gray-400">How fast can you react? Test and improve your reflexes!</p>
  </Link>

  {/* Tic Tac Toe */}
  <Link href="/TicTacToe" className="bg-black/50 border border-purple-600 hover:border-yellow-400 p-6 rounded-xl transition-all duration-300 hover:scale-105 hover:bg-purple-800 shadow-lg text-center">
    <h2 className="text-xl font-semibold text-yellow-300 mb-2">🎯 Tic Tac Toe</h2>
    <p className="text-sm text-gray-400">Classic X vs O with a twist — play vs friend or AI with voice feedback and savage win comments!</p>
  </Link>

  {/* Flappy Bird */}
  <Link href="/flappy" className="bg-black/50 border border-purple-600 hover:border-yellow-400 p-6 rounded-xl transition-all duration-300 hover:scale-105 hover:bg-purple-800 shadow-lg text-center">
    <h2 className="text-xl font-semibold text-yellow-300 mb-2">🐦 Flappy Bird</h2>
    <p className="text-sm text-gray-400">Tap to flap and dodge the pipes! Addictive fun with voice feedback and game-over roasts 😆🔥</p>
  </Link>

{/* Quiz Game */}
<Link
  href="/quiz"
  className="bg-black/50 border border-purple-600 hover:border-yellow-400 p-6 rounded-xl transition-all duration-300 hover:scale-105 hover:bg-purple-800 shadow-lg text-center"
>
  <h2 className="text-xl font-semibold text-yellow-300 mb-2">🧠 Ultimate IQ Quiz</h2>
  <p className="text-sm text-gray-400">
    Challenge your brain with high-level IQ questions, fast timers ⏱️, emoji reactions 🤖😵, and voice feedback. Only geniuses survive! 🧩💡
  </p>
</Link>



</div>




      {/* Credit */}
      <footer className="mt-20 text-center text-sm text-gray-500 animate-pulse">
        👑 Crafted by <span className="text-pink-400 font-bold italic">Syed Zain Ali Shah</span> — The Gamer Dev Mastermind
      </footer>
    </div>
  );
}
