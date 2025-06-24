'use client';

import { useEffect, useState } from 'react';

export default function FlappyBird() {
  const [birdY, setBirdY] = useState(250);
  const [velocity, setVelocity] = useState(0);
  const [pipes, setPipes] = useState([{ x: 400, height: 200 }]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 400, height: 800 });

  const gravity = 1;
  const jump = -10;
  const gap = 200;

  const flap = () => {
    if (gameOver) return;
    setVelocity(jump);
  };

  const resetGame = () => {
    setBirdY(250);
    setVelocity(0);
    setPipes([{ x: windowSize.width, height: 200 }]);
    setScore(0);
    setGameOver(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (gameOver) return;

    const speed = windowSize.width > 768 ? 14 : 6;

    const gameLoop = setInterval(() => {
      setVelocity((v) => v + gravity);
      setBirdY((y) => y + velocity);

      setPipes((prev) =>
        prev.map((pipe) => ({ ...pipe, x: pipe.x - speed }))
      );

      const pipe = pipes[0];
      if (pipe && pipe.x < -60) {
        setScore((s) => s + 1);
        setPipes([
          {
            x: windowSize.width,
            height: Math.random() * (windowSize.height / 2) + 100,
          },
        ]);
      }

      if (
        pipe &&
        pipe.x < 100 &&
        pipe.x > 40 &&
        (birdY < pipe.height || birdY > pipe.height + gap)
      ) {
        setGameOver(true);
      }

      if (birdY > windowSize.height - 50 || birdY < 0) {
        setGameOver(true);
      }
    }, 30);

    return () => clearInterval(gameLoop);
  }, [birdY, velocity, pipes, gameOver, windowSize]);

  return (
    <div
      onClick={flap}
      className="w-screen h-screen bg-gradient-to-b from-sky-400 to-blue-900 overflow-hidden relative"
      style={{ touchAction: 'manipulation' }}
    >
      {/* Bird */}
      <div
        className="absolute w-12 h-12 text-3xl"
        style={{ top: birdY, left: 80 }}
      >
        🐥
      </div>

      {/* Pipe Top */}
      <div
        className="absolute w-16 bg-green-600"
        style={{
          height: pipes[0].height,
          left: pipes[0].x,
          top: 0,
        }}
      ></div>

      {/* Pipe Bottom */}
      <div
        className="absolute w-16 bg-green-600"
        style={{
          height: windowSize.height - pipes[0].height - gap,
          left: pipes[0].x,
          top: pipes[0].height + gap,
        }}
      ></div>

      {/* Score */}
      <div className="absolute top-4 left-4 bg-black/60 text-white px-4 py-1 rounded-full font-bold text-lg">
        Score: {score}
      </div>

      {/* Game Over */}
      {gameOver && (
        <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white text-center p-4">
          <h1 className="text-4xl mb-2 font-bold text-red-400">Game Over</h1>
          <p className="text-lg mb-4">
            Final Score: <span className="text-yellow-300">{score}</span>
          </p>
          <div className="flex gap-4">
            <button
              onClick={resetGame}
              className="bg-yellow-400 text-black px-6 py-2 rounded-full font-bold hover:bg-yellow-500"
            >
              🔁 Restart
            </button>
            <button
              onClick={() => (window.location.href = '/')}
              className="bg-red-500 text-white px-6 py-2 rounded-full font-bold hover:bg-red-600"
            >
              ❌ Exit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
