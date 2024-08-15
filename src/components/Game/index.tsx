import { VerseApi } from '@/interfaces';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Round } from '../Round';
import { LEVELS, ROUNDS } from '@/constants';
import { Results } from '../Results';
import { Button } from '../Button';
import { Loader } from '../Loader';
import { clickPlayAgain } from '@/services/gtm';
import { captureException } from '@sentry/nextjs';

export interface GameProps {
  level: number;
  onPlayAgain: () => void;
}

export const Game = ({level, onPlayAgain}: GameProps) => {
  const [gameVerses, setGameVerses] = useState<VerseApi[]>([]);
  const [tracks, setTracks] = useState<string[]>([]);
  const [round, setRound] = useState<number>(0);
  const [currentVerse, setCurrentVerse] = useState<VerseApi>();
  const [results, setResults] = useState<{track: string, answer: string, correct: boolean, time: number}[]>([]);
  const [gameFinished, setGameFinished] = useState<boolean>(false);

  useEffect(() => {
    const getTracks = async () => {
      try {
        const { data } = await axios.get(`/api/tracks`);
        const tracks = data.map((album: any) => album.tracks).flat().sort();
        setTracks(tracks);
      } catch(error) {
        // console.error(error);
        captureException(error);
      }
    };
    
    const getGameVerses = async () => {
      try {
        const { data } = await axios.get<VerseApi[]>(`/api/${LEVELS[level].code}/${ROUNDS}`);
        setGameVerses(data);
        setRound(1);
        setCurrentVerse(data[0]);
      } catch(error) {
        // console.error(error);
        captureException(error);
      }
    };
    
    getTracks();
    getGameVerses();
  }, [level]);

  const nextRound = () => {
    const nextRound = round + 1;
    if(nextRound > ROUNDS) {
      finishGame();
      return;
    }
    setRound(nextRound);
    setCurrentVerse(gameVerses[nextRound - 1]);
  };

  const finishGame = () => {
    setGameFinished(true);
  };

  const handleFinish = (track: string, answer: string, correct: boolean, time: number) => {
    const newResults = [...results, {track, answer, correct, time}];
    setResults(newResults);
    nextRound();
  };

  const handlePlayAgain = () => {
    onPlayAgain();
    clickPlayAgain(level, results.filter(result => result.correct).length);
  };

  return (
    <div
      className="w-full max-w-xl flex flex-col items-center gap-4"
    >
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-lg font-semibold">
          What {process.env.NEXT_PUBLIC_SITE_ARTIST_SHORT_NAME} song is it?
        </h2>
        <div>
          <h3 className="text-base font-semibold">Level: {LEVELS[level].name} ({LEVELS[level].difficulty})</h3>
        </div>
      </div>
      {(!gameVerses.length || !tracks.length) &&
        <div className="size-12 border-purple-700">
          <Loader borderWidth='4px' />
        </div>
      }
      {currentVerse && !gameFinished &&
        <div className="w-full">
          <Round
            verse={currentVerse}
            tracks={tracks}
            round={round}
            rounds={ROUNDS}
            onFinish={handleFinish}
            level={level}
          />  
        </div>
      }
      {gameFinished &&
        <>
          <Results
            level={level}
            results={results}
          />
          <Button
            onClick={handlePlayAgain}
          >
            <div className="text-lg font-semibold">
              Play again
            </div>
          </Button>
        </>
      }
    </div>
  );
};
