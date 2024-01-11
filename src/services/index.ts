import { TrackApi, VerseApi } from '@/interfaces';
import { albums, trackNames, bridges, chorus, verses, words5, words7 } from '../data';

export const getTrackNames = (): TrackApi[] => {
  return trackNames;
};

export const getRandomNBridges = (count: number): VerseApi[] => {
  const randomBridges = [];
  for(let i = 0; i < count; i++) {
    const randomAlbum = Math.floor(Math.random() * bridges.length);
    const albumBridges = bridges[randomAlbum];
    const randomTrack = Math.floor(Math.random() * albumBridges.tracks.length);
    const trackBridges = albumBridges.tracks[randomTrack];
    const randomVerse = Math.floor(Math.random() * trackBridges.verses.length);
    const verse = trackBridges.verses[randomVerse];
    randomBridges.push({
      album: albumBridges.title,
      track: trackBridges.title,
      verse,
    });
  }
  return randomBridges;
};

export const getRandomNChorus = (count: number): VerseApi[] => {
  const randomChorus = [];
  for(let i = 0; i < count; i++) {
    const randomAlbum = Math.floor(Math.random() * chorus.length);
    const albumChorus = chorus[randomAlbum];
    const randomTrack = Math.floor(Math.random() * albumChorus.tracks.length);
    const trackChorus = albumChorus.tracks[randomTrack];
    const randomVerse = Math.floor(Math.random() * trackChorus.verses.length);
    const verse = trackChorus.verses[randomVerse];
    randomChorus.push({
      album: albumChorus.title,
      track: trackChorus.title,
      verse,
    });
  }
  return randomChorus;
}

export const getRandomNVerses = (count: number): VerseApi[] => {
  const randomVerses = [];
  for(let i = 0; i < count; i++) {
    const randomAlbum = Math.floor(Math.random() * verses.length);
    const albumVerses = verses[randomAlbum];
    const randomTrack = Math.floor(Math.random() * albumVerses.tracks.length);
    const trackVerses = albumVerses.tracks[randomTrack];
    const randomVerse = Math.floor(Math.random() * trackVerses.verses.length);
    const verse = trackVerses.verses[randomVerse];
    randomVerses.push({
      album: albumVerses.title,
      track: trackVerses.title,
      verse,
    });
  }
  return randomVerses;
}

// lines with at least 7 words
export const getRandomNLines = (count: number): VerseApi[] => {
  const randomLines = [];
  for(let i = 0; i < count; i++) {
    const randomAlbum = Math.floor(Math.random() * words7.length);
    const albumLines = words7[randomAlbum];
    const randomTrack = Math.floor(Math.random() * albumLines.tracks.length);
    const trackLines = albumLines.tracks[randomTrack];
    const randomLine = Math.floor(Math.random() * trackLines.verses.length);
    const verse = trackLines.verses[randomLine];
    randomLines.push({
      album: albumLines.title,
      track: trackLines.title,
      verse,
    });
  }
  return randomLines;
};

export const getRandomNWords = (count: number): VerseApi[] => {
  const randomWords = [];
  for(let i = 0; i < count; i++) {
    const randomWord = getRandom5Words();
    randomWords.push(randomWord);
  }
  return randomWords;
};

export const getRandom5Words = (): VerseApi => {
  const randomAlbum = Math.floor(Math.random() * words5.length);
  const album = words5[randomAlbum];
  const randomTrack = Math.floor(Math.random() * album.tracks.length);
  const track = album.tracks[randomTrack];
  const randomLine = Math.floor(Math.random() * track.verses.length);
  const line = track.verses[randomLine];
  const words = line.split(/\s+/);
  const randomWords = Math.floor(Math.random() * (words.length - 5));
  return {
    album: album.title,
    track: track.title,
    verse: words.slice(randomWords, randomWords + 5).join(' '),
  };
};

export const formatTime = (time: number) => {
  const seconds = Math.floor(time / 1000);
  const ds = (time % 1000) / 100;
  return `${seconds}.${ds}`;
};
