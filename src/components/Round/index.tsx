import { VerseApi, levels } from "@/interfaces";
import { ChangeEvent, useEffect, useRef, useState } from "react";

export interface RoundProps {
  verse: VerseApi;
  tracks: string[];
  onFinish: (correct: boolean, selectedTrack: string) => void;
}

export const Round = ({verse, tracks, onFinish}: RoundProps) => {
  const [correct, setCorrect] = useState<boolean>(false);
  const [incorrect, setIncorrect] = useState<boolean>(false);
  const [trackName, setTrackName] = useState<string>('');
  const [filteredTracks, setFilteredTracks] = useState<string[]>([]);
  const [isSelectedTrack, setIsSelectedTrack] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleTrackSelect = (trackName: string) => {
    console.log(verse.track, trackName);
    setTrackName(trackName);
    setFilteredTracks([]);
    const isCorrect = verse.track === trackName;
    if(isCorrect) {
      setCorrect(true);
      setIncorrect(false);
    } else {
      setCorrect(false);
      setIncorrect(true);
    }
    onFinish(isCorrect, trackName);
  };

  useEffect(() => {
    console.log('reset', isSelectedTrack);
    setCorrect(false);
    setIncorrect(false);
    setTrackName('');
    setIsSelectedTrack((prev) => {inputRef.current?.focus(); return false;});
  }, [verse]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTrackName(value);
    if(value.length < 2) {
      setFilteredTracks([]);
      return;
    };
    const filteredTracks = tracks.filter((track) => track.toLowerCase().includes(value.toLowerCase()));
    setFilteredTracks(filteredTracks);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-full whitespace-pre-wrap italic">
        {verse.verses[0].verse.replace(/^\[.*\]\n/, '')}
      </div>
      <div className="w-full">
        <input
          type="text"
          className="w-full h-12 bg-purple-200 rounded p-2 text-neutral-900"
          placeholder="Type the song name"
          onChange={handleInputChange}
          value={trackName}
          disabled={isSelectedTrack}
          ref={inputRef}
        />
        <ul className="w-full max-h-64 overflow-scroll -translate-y-0">
          {filteredTracks.map((track) => (
            <li
              key={track}
              className="w-full bg-purple-200 p-2 text-neutral-900 hover:bg-purple-400"
              onClick={() => handleTrackSelect(track)}
            >
              {track}
            </li>
          ))}
        </ul>
      </div>
      {correct &&
        <div className="w-full">
          <h1 className="text-2xl text-center text-green-500">Correct!</h1>
        </div>
      }
      {incorrect &&
        <div className="w-full">
          <h1 className="text-2xl text-center text-red-500">Incorrect!</h1>
        </div>
      }
    </div>
  );
};
