import { useState } from 'react';
import { Button } from '../Button';

export interface LevelProps {
  onSelect: (level: number) => void;
}

export const Level = ({onSelect}: LevelProps) => {
  const handleSelect = (level: number) => {
    onSelect(level);
  };

  return (
    <div className="w-full flex flex-col gap-8">
      <h2 className="text-lg font-semibold text-center">
        What {process.env.NEXT_PUBLIC_SITE_ARTIST_SHORT_NAME}&apos;s song is it?
      </h2>
      <div className="flex flex-col gap-4">
        <div className="flex justify-center">
          <h4 className="text-lg">Select a level</h4>
        </div>
        <div className="flex flex-col items-center gap-4">
          <Button
            onClick={() => handleSelect(0)}
          >
            <div className="text-lg font-semibold leading-none">
              CHORUS
            </div>
            <div className="text-xs leading-none">
              easy
            </div>
          </Button>
          <Button
            onClick={() => handleSelect(1)}
          >
            <div className="text-lg font-semibold leading-none">
              BRIDGE
            </div>
            <div className="text-xs leading-none">
              medium
            </div>
          </Button>
          <Button
            onClick={() => handleSelect(2)}
          >
            <div className="text-lg font-semibold leading-none">
              VERSE
            </div>
            <div className="text-xs leading-none">
              hard
            </div>
          </Button>
          <Button
            onClick={() => handleSelect(3)}
          >
            <div className="text-lg font-semibold leading-none">
              LINE
            </div>
            <div className="text-xs leading-none">
              very hard
            </div>
          </Button>
          <Button
            onClick={() => handleSelect(4)}
          >
            <div className="text-lg font-semibold leading-none">
              5 WORDS
            </div>
            <div className="text-xs leading-none">
              insane
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};
