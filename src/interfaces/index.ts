export interface Album {
  title: string;
  tracks: Track[];
}

export interface Track {
  title: string;
  lyrics: string;
  verses: Verse[];
}

export interface TrackApi {
  album: string;
  track: string;
  lyrics: string;
}

export interface Verse {
  name: string;
  verse: string;
}

export interface VerseApi {
  album: string;
  track: string;
  verses: Verse[];
}

export const levels = [
  'chorus',
  'bridge',
  'verse',
  'line',
  'words',
];
