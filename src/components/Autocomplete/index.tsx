import { ChangeEvent, useEffect, useRef, useState } from 'react';

export interface AutocompleteProps {
  trackName: string;
  filteredTracks: string[];
  disabled: boolean;
  focus: boolean;
  onTrackSelect: (trackName: string) => void;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
}

export const Autocomplete = ({
  trackName,
  filteredTracks,
  disabled,
  focus,
  onTrackSelect,
  onInputChange,
  onFocus,
}: AutocompleteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelect = (track: string) => {
    onTrackSelect(track);
  }

  useEffect(() => {
    if (focus) {
      inputRef.current?.focus();
    }
  }, [focus]);

  return (
    <>
      <input
        type="text"
        className="w-full h-12 bg-purple-200 rounded px-3 py-4 text-neutral-900 focus:outline-none focus:ring-4 focus:ring-purple-600"
        placeholder="Type the song name"
        onChange={onInputChange}
        value={trackName}
        disabled={disabled}
        ref={inputRef}
        onFocus={onFocus}
      />
      <ul className="w-full max-h-64 overflow-scroll mt-1 rounded shadow">
        {filteredTracks.map((track, i) => (
          <li
            key={track}
            className="w-full h-12 bg-purple-200 px-3 flex items-center text-neutral-900 hover:bg-purple-400 leading-none select-none cursor-pointer"
            onClick={() => handleSelect(track)}
          >
            {track}
          </li>
        ))}
      </ul>
    </>
  );
};
