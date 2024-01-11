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
  title: string;
  tracks: string[];
}

export interface Verse {
  name: string;
  verse: string;
}

export interface VerseApi {
  album: string;
  track: string;
  verse: string;
}
