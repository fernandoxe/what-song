import { useState } from 'react';

export interface LevelProps {
  onSelect: (level: number) => void;
}

export const Level = ({onSelect}: LevelProps) => {
  const [levelSelected, setLevelSelected] = useState<number>();

  const handleSelect = (level: number) => { 
    setLevelSelected(level);
    setTimeout(() => {
      onSelect(level);
    }, 200);
  };

  return (
    <div className="w-full flex flex-col items-center gap-4 text-neutral-900">
      <h2 className="text-2xl text-neutral-200">Select a level</h2>
      <button
        className={`w-32 h-16 bg-purple-200 rounded ${levelSelected === 0 ? 'bg-purple-400' : ''}`}
        onClick={() => handleSelect(0)}
      >
        <div className="text-lg">
          Chorus
        </div>
        <div className="text-xs">
          Easy
        </div>
      </button>
      <button
        className={`w-32 h-16 bg-purple-200 rounded ${levelSelected === 1 ? 'bg-purple-400' : ''}`}
        onClick={() => handleSelect(1)}
      >
        <div className="text-lg">
          Bridge
        </div>
        <div className="text-xs">
          Medium
        </div>
      </button>
      <button
        className={`w-32 h-16 bg-purple-200 rounded ${levelSelected === 2 ? 'bg-purple-400' : ''}`}
        onClick={() => handleSelect(2)}
      >
        <div className="text-lg">
          Verse
        </div>
        <div className="text-xs">
          Hard
        </div>
      </button>
      <button
        className={`w-32 h-16 bg-purple-200 rounded ${levelSelected === 3 ? 'bg-purple-400' : ''}`}
        onClick={() => handleSelect(3)}
      >
        <div className="text-lg">
          Line
        </div>
        <div className="text-xs">
          Very hard
        </div>
      </button>
      <button
        className={`w-32 h-16 bg-purple-200 rounded ${levelSelected === 4 ? 'bg-purple-400' : ''}`}
        onClick={() => handleSelect(4)}
      >
        <div className="text-lg">
          5 words
        </div>
        <div className="text-xs">
          Insane
        </div>
      </button>
    </div>
  );
};
