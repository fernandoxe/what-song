import { Verse, VerseApi } from '@/interfaces';
import { albums, trackNames, words5, words7 } from '../data';

export const getTrackNames = () => {
  return trackNames;
};

export const countWords = (count: number) => {
  const versesLessThanCount: Verse[] = [];
  albums.forEach((album) => {
    album.tracks.forEach((track) => {
      track.verses.forEach((verse) => {
        const verseWords = verse.verse.replace(/^\[.*\]\n/i, '').split(/\s+/).length;
        if(verseWords <= count) {
          versesLessThanCount.push(verse);
        }
      });
    });
  });
  return versesLessThanCount;
};

export const getRandomNLines = (count: number) => {
  const randomLines = [];
  for(let i = 0; i < count; i++) {
    const randomLine = getRandomLine();
    randomLines.push(randomLine);
  }
  return randomLines;
};

export const getRandomNWords = (count: number) => {
  const randomWords = [];
  for(let i = 0; i < count; i++) {
    const randomWord = getRandom5Words();
    randomWords.push(randomWord);
  }
  return randomWords;
};

export const getRandomLine = () => {
  const randomAlbum = Math.floor(Math.random() * words7.length);
  const album = words7[randomAlbum];
  const randomTrack = Math.floor(Math.random() * album.tracks.length);
  const track = album.tracks[randomTrack];
  const randomLine = Math.floor(Math.random() * track.verses.length);
  return {
    album: album.title,
    track: track.title,
    verses: [
      {verse: track.verses[randomLine]}
    ],
  };
};

export const getRandom5Words = () => {
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
    verses: [
      {verse: words.slice(randomWords, randomWords + 5).join(' ')}
    ],
  };
};

export const getRandomNBridges = (count: number): VerseApi[] => {
  const randomBridges = [];
  for(let i = 0; i < count; i++) {
    const randomBridge = getRandomBridge();
    randomBridges.push(randomBridge);
  }
  return randomBridges;
};

export const getRandomNChorus = (count: number): VerseApi[] => {
  const randomChorus = [];
  for(let i = 0; i < count; i++) {
    const randomVerse = getRandomChorus();
    randomChorus.push(randomVerse);
  }
  return randomChorus;
};

export const getRandomNVerses = (count: number): VerseApi[] => {
  const randomVerses = [];
  for(let i = 0; i < count; i++) {
    const randomVerse = getRandomVerse();
    randomVerses.push(randomVerse);
  }
  return randomVerses;
};

export const getRandomBridge = (): VerseApi => {
  const allBridges = albums.map((album, i) => getBridges(i)).flat();
  const randomBridge = Math.floor(Math.random() * allBridges.length);
  const trackBridges = allBridges[randomBridge];
  const bridge = trackBridges.verses[Math.floor(Math.random() * trackBridges.verses.length)];
  return {
    album: trackBridges.album,
    track: trackBridges.track,
    verses: [bridge],
  };
};

export const getRandomChorus = (): VerseApi => {
  const allChorus = albums.map((album, i) => getChorus(i)).flat();
  const randomChorus = Math.floor(Math.random() * allChorus.length);
  const chorusVerses: VerseApi = allChorus[randomChorus];
  const chorus = chorusVerses.verses[Math.floor(Math.random() * chorusVerses.verses.length)];
  return {
    album: chorusVerses.album,
    track: chorusVerses.track,
    verses: [chorus],
  };
};

export const getRandomVerse = (): VerseApi => {
  const allVerses = albums.map((album, i) => getVerses(i)).flat();
  const randomVerse = Math.floor(Math.random() * allVerses.length);
  const verses: VerseApi = allVerses[randomVerse];
  const verse = verses.verses[Math.floor(Math.random() * verses.verses.length)];
  return {
    album: verses.album,
    track: verses.track,
    verses: [verse],
  };
};

export const getBridges = (album: number) => {
  const tracksWithBridge = albums[album].tracks
    .filter((track) => track.verses.some(isBridge));
  const bridges: VerseApi[] = tracksWithBridge.map((track) => {
    return {
      album: albums[album].title,
      track: track.title,
      verses: track.verses.filter(isBridge),
    };
  });
  return bridges;
};

export const getChorus = (album: number) => {
  const tracksWithBridge = albums[album].tracks
    .filter((track) => track.verses.some(isChorus));
  const chorus: VerseApi[] = tracksWithBridge.map((track) => {
    return {
      album: albums[album].title,
      track: track.title,
      verses: track.verses.filter(isChorus),
    };
  });
  return chorus;
};

export const getVerses = (album: number) => {
  const tracks = albums[album].tracks;
  const tracksWithVerse = tracks.filter((track) => track.verses.some(isVerse));
  const verses: VerseApi[] = tracksWithVerse.map((track) => {
    return {
      album: albums[album].title,
      track: track.title,
      verses: track.verses.filter(isVerse),
    };
  });
  return verses;
};

const isChorus = (verse: Verse) => verse.name.toLowerCase().startsWith('chorus');
const isBridge = (verse: Verse) => verse.name.toLowerCase().startsWith('bridge');
const isVerse = (verse: Verse) => !isChorus(verse) && !isBridge(verse);

export const formatTime = (time: number) => {
  const seconds = Math.floor(time / 1000);
  const ds = (time % 1000) / 100;
  return `${seconds}.${ds}`;
};
