import { VerseApi, levels } from "@/interfaces";
import axios from "axios";
import { useEffect, useState } from "react";
import { Round } from "../Round";
import { ROUNDS } from "@/constants";
import { Results } from "../Results";

export interface GameProps {
  level: number;
  onPlayAgain: () => void;
}

export const Game = ({level, onPlayAgain}: GameProps) => {
  const [gameVerses, setGameVerses] = useState<VerseApi[]>([]);
  const [tracks, setTracks] = useState<string[]>([]);
  const [round, setRound] = useState<number>(0);
  const [currentVerse, setCurrentVerse] = useState<VerseApi>();
  const [results, setResults] = useState<{track: string, correct: boolean}[]>([]);
  const [gameFinished, setGameFinished] = useState<boolean>(false);

  useEffect(() => {
    const getTracks = async () => {
      try {
        const { data } = await axios.get<VerseApi[]>(`/api/${levels[level]}/${ROUNDS}`);
        setGameVerses(data);
        setRound(1);
        setCurrentVerse(data[0]);
      } catch(error) {
        console.error(error);
      }
    };

    const getGameVerses = async () => {
      try {
        const { data } = await axios.get(`api/tracks`);
        const tracks = data.map((album: any) => album.tracks).flat().sort();
        setTracks(tracks);
      } catch(error) {
        console.error(error);
      }
    };

    getGameVerses();
    getTracks();
  }, [level]);

  const nextRound = (results: {track: string, correct: boolean}[]) => {
    const nextRound = round + 1;
    if(nextRound > ROUNDS) {
      finishGame(results);
      return;
    }
    setRound(nextRound);
    setCurrentVerse(gameVerses[nextRound - 1]);
  };

  const finishGame = (results: {track: string, correct: boolean}[]) => {
    setGameFinished(true);
    console.log('game over', results);
  };

  const handleFinish = (correct: boolean, selectedTrack: string) => {
    const newResults = [...results, {track: selectedTrack, correct}];
    setResults(newResults);
    setTimeout(() => {
      nextRound(newResults);
    }, 1000);
  };

  const handlePlayAgain = () => {
    setTimeout(() => {
      onPlayAgain();
    }, 500);
  };

  return (
    <div className="w-full max-w-xl flex flex-col items-center gap-4">
      <div>
        <h3 className="text-xl">{levels[level]}</h3>
      </div>
      {!gameFinished &&
        <h4 className="text-lg">
          What song is this?
        </h4>
      }
      {round > 0 && currentVerse && !gameFinished &&
        <div className="w-full">
          <Round
            verse={currentVerse}
            tracks={tracks}
            onFinish={handleFinish}
          />  
        </div>
      }
      {gameFinished &&
        <>
          <Results results={results} />
          <button
            className="h-12 bg-purple-200 rounded px-4 py-2 text-neutral-900"
            onClick={handlePlayAgain}
          >
            Play again
          </button>
        </>
      }
    </div>
  );
};
