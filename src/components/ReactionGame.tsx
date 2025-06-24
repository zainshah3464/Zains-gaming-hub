'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ReactionGame() {
  const [gameState, setGameState] = useState<'idle' | 'countdown' | 'waiting' | 'ready' | 'clicked'>('idle');
  const [message, setMessage] = useState('Click to start the test!');
  const [countdown, setCountdown] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<number>(0);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [history, setHistory] = useState<number[]>([]);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const speak = (text: string) => {
    const msg = new SpeechSynthesisUtterance(text);
    msg.rate = 1.1;
    speechSynthesis.cancel();
    speechSynthesis.speak(msg);
  };

  const getFeedback = (time: number) => {
    if (time < 200) return { emoji: '🤯', text: 'Excellent!', voice: 'Excellent!' };
    if (time < 300) return { emoji: '⚡', text: 'Good!', voice: 'Good job!' };
    if (time < 500) return { emoji: '🙂', text: 'Average!', voice: 'Not bad!' };
    return { emoji: '🐢', text: 'Too slow!', voice: 'Too slow!' };
  };

  const startCountdown = () => {
    speak('countdown');
    setGameState('countdown');
    let count = 3;
    setCountdown(count);
    const interval = setInterval(() => {
      count -= 1;
      setCountdown(count);
      if (count <= 0) {
        clearInterval(interval);
        startGame();
      }
    }, 1000);
  };

  const startGame = () => {
    setGameState('waiting');
    setMessage('Wait for green...');
    const delay = Math.random() * 4000 + 1000;
    const id = setTimeout(() => {
      setGameState('ready');
      setMessage('Click now!');
      setStartTime(Date.now());
    }, delay);
    setTimeoutId(id);
  };

  const handleClick = () => {
    if (gameState === 'idle') {
      setReactionTime(null);
      setFeedback(null);
      startCountdown();
    } else if (gameState === 'countdown') {
      speak('Too early!');
      setGameState('idle');
      setMessage('Wait for countdown!');
    } else if (gameState === 'waiting') {
      if (timeoutId) clearTimeout(timeoutId);
      speak('Too soon!');
      setGameState('idle');
      setMessage('Too soon! Wait for green...');
    } else if (gameState === 'ready') {
      const time = Date.now() - startTime;
      const fb = getFeedback(time);
      speak(fb.voice);
      setReactionTime(time);
      setFeedback(`${fb.emoji} ${fb.text}`);
      setBestTime((prev) => (prev === null || time < prev ? time : prev));
      setHistory((prev) => [time, ...prev.slice(0, 4)]);
      setGameState('clicked');
      setMessage(`Your time: ${time} ms`);
    } else if (gameState === 'clicked') {
      speak('Click to start the test!');
      setGameState('idle');
      setMessage('Click to start the test!');
      setFeedback(null);
    }
  };

  return (
    <div className="w-full max-w-xl flex flex-col items-center justify-center text-center gap-6">
      <Link href="/" className="text-sm text-yellow-300 underline hover:text-pink-400 self-start">
        ← Back to Hub
      </Link>
      <div
        onClick={handleClick}
        className={`w-full py-20 px-6 rounded-3xl text-2xl font-bold cursor-pointer transition-all 
        ${
          gameState === 'ready'
            ? 'bg-green-500 animate-pulse'
            : gameState === 'waiting'
            ? 'bg-red-700'
            : gameState === 'countdown'
            ? 'bg-purple-700 text-black'
            : 'bg-purple-800'
        } text-white hover:scale-105 border-2 border-purple-600`}
      >
        {gameState === 'countdown' ? `Starting in ${countdown}...` : message}
      </div>

      {reactionTime !== null && <div className="text-lg text-yellow-300">Reaction Time: <strong>{reactionTime} ms</strong></div>}
      {feedback && <div className="text-2xl font-bold text-white animate-bounce">{feedback}</div>}
      {bestTime !== null && <div className="text-sm text-gray-300">Best Time: <strong>{bestTime} ms</strong></div>}
      {history.length > 0 && (
        <div className="text-sm text-white">
          <p className="underline">Last 5 Scores:</p>
          <ul className="mt-1">
            {history.map((t, i) => (
              <li key={i}>Attempt {i + 1}: <strong>{t} ms</strong></li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
