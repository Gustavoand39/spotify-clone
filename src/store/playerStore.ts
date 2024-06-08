import { create } from "zustand";
import type { Playlist, Song } from "@/lib/data";

interface PlayerStore {
  isPlaying: boolean;
  currentSong: { playlist: Playlist | null; song: Song | null; songs: Song[] };
  volume: number;
  setIsPlaying: (isPlaying: boolean) => void;
  setCurrentSong: (currentSong: {
    playlist: Playlist | null;
    song: Song | null;
    songs: Song[];
  }) => void;
  setVolume: (volume: number) => void;
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  isPlaying: false,
  currentSong: { playlist: null, song: null, songs: [] },
  volume: 1,
  setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
  setCurrentSong: (currentSong: any) => set({ currentSong }),
  setVolume: (volume: number) => set({ volume }),
}));
