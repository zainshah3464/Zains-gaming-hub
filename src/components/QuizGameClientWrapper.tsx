"use client";

import { useState } from "react";
import QuizGame from "./QuizGame";

export default function QuizGameClientWrapper() {
  const [started, setStarted] = useState(false);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black via-purple-950 to-black flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background Animation Blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-700 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse -z-10" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-ping delay-1000 -z-10" />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-spin-slow -translate-x-1/2 -translate-y-1/2 -z-10" />

      {!started ? (
        <div className="text-center bg-black/70 backdrop-blur-xl p-8 sm:p-12 rounded-3xl shadow-[0_0_60px_#9333ea80] border border-purple-700 max-w-2xl w-full transition-all duration-300">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500 animate-pulse mb-6 leading-tight">
            🧠 Welcome to the Quiz Game
          </h1>
          <p className="text-purple-200 text-base sm:text-lg mb-8 leading-relaxed">
            Ready to test your brain? Let’s see if you can dominate the leaderboard!
          </p>
          <button
            onClick={() => setStarted(true)}
            className="bg-yellow-400 text-black px-8 sm:px-10 py-3 sm:py-4 rounded-full text-lg sm:text-xl font-bold shadow-lg hover:scale-105 hover:bg-yellow-500 transition-transform duration-300"
          >
            🚀 Start Quiz
          </button>
          
        </div>
      ) : (
        <QuizGame />
      )}
    </div>
  );
}
