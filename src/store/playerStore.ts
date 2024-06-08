import { create } from "zustand";
import type { Playlist, Song } from "@/lib/data";

interface PlayerStore {
  isPlaying: boolean;
  currentSong: { playlist: Playlist | null; song: Song | null; songs: Song[] };
  setIsPlaying: (isPlaying: boolean) => void;
  setCurrentSong: (currentSong: {
    playlist: Playlist | null;
    song: Song | null;
    songs: Song[];
  }) => void;
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  isPlaying: false,
  currentSong: { playlist: null, song: null, songs: [] },
  setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
  setCurrentSong: (currentSong: any) => set({ currentSong }),
}));
