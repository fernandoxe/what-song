'use client';
import { Level } from '../Level';
import { useState } from 'react';
import { Game } from '../Game';

export const Home = () => {
  const [level, setLevel] = useState<number>(-1);

  const handleLevelSelect = (level: number) => {
    setLevel(level);
  };

  const handlePlayAgain = () => {
    setLevel(-1);
  };

  return (
    <main className="w-full font-open flex flex-col items-center justify-between gap-4 p-4">
      { level < 0 &&
        <Level onSelect={handleLevelSelect}/>
      }
      {level >= 0 &&
        <Game
          level={level}
          onPlayAgain={handlePlayAgain}
        />
      }
    </main>
  );
};
