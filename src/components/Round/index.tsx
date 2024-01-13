import { VerseApi } from '@/interfaces';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Autocomplete } from '../Autocomplete';
import { RoundResult } from '../RoundResult';
import { useStopwatch } from '@/hooks/useStopwatch';
import { formatTime } from '@/services';
import { selectTrack } from '@/services/gtm';

export interface RoundProps {
  verse: VerseApi;
  tracks: string[];
  round: number;
  rounds: number;
  level: number;
  onFinish: (track: string, answer: string, correct: boolean, time: number) => void;
}

export const Round = ({verse, tracks, round, rounds, level, onFinish}: RoundProps) => {
  const [correct, setCorrect] = useState(false);
  const [trackName, setTrackName] = useState('');
  const [filteredTracks, setFilteredTracks] = useState<string[]>([]);
  const [isSelectedTrack, setIsSelectedTrack] = useState(false); // True when the user has selected a track
  const [focusInput, setFocusInput] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const { time, restart, pause } = useStopwatch();
  const roundRef = useRef<HTMLDivElement>(null);
  const lyricsRef = useRef<HTMLDivElement>(null);

  const handleTrackSelect = (trackName: string) => {
    pause();
    setTrackName(trackName);
    setFilteredTracks([]);
    setIsSelectedTrack(true);
    setFocusInput(false);
    const isCorrect = verse.track === trackName;
    if(isCorrect) {
      setCorrect(true);
    } else {
      setCorrect(false);
    }
    setShowResult(true);
    selectTrack(
      level,
      verse.track,
      trackName,
      time,
      isCorrect
    );
  };

  const handleResultAnimationComplete = () => {
    setTimeout(() => {
      setShowResult(false);
      onFinish(verse.track, trackName, correct, time);
    }, 1000);
  };

  useEffect(() => {
    setCorrect(false);
    setTrackName('');
    setIsSelectedTrack(false);
    setFocusInput(true);
    restart();
    lyricsRef.current?.scrollTo(0, 0);
  }, [verse]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTrackName(value);
    if(value.length < 2) {
      setFilteredTracks([]);
      return;
    };
    const normalizedValue = value.trim().toLowerCase();
    const filteredTracks = tracks.filter((track) => track.toLowerCase().includes(normalizedValue));
    setFilteredTracks(filteredTracks);
  };

  const handleFocus = () => {
    roundRef.current?.scrollIntoView({behavior: 'smooth'});
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-full flex flex-col gap-2 px-8">
        <div className="flex justify-between text-xs">
          <div ref={roundRef}>
            {round} / {rounds}
          </div>
          <div className="font-mono select-none">
            {formatTime(time)}s
          </div>
        </div>
        <div
          className="flex flex-col font-indie w-full min-h-28 max-h-44 overflow-scroll whitespace-pre-wrap bg-purple-50 rounded py-3 shadow select-none"
          ref={lyricsRef}
        >
          <div className="grow bg-[linear-gradient(#c2c4d7_1px,_transparent_1px)] bg-[size:_100%_1.5rem] bg-[position:_0_-1px] pt-2 px-3">
            {verse.verse.replace(/^\[.*\]\n/, '')}
          </div>
        </div>
      </div>
      <div className="w-full">
        <Autocomplete
          trackName={trackName}
          filteredTracks={filteredTracks}
          disabled={isSelectedTrack}
          focus={focusInput}
          onTrackSelect={handleTrackSelect}
          onInputChange={handleInputChange}
          onFocus={handleFocus}
        />
      </div>
      {showResult &&
        <RoundResult
          correct={correct}
          track={verse.track}
          onAnimationComplete={handleResultAnimationComplete}
        />
      }
    </div>
  );
};
