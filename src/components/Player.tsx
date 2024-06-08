import { useEffect, useRef } from "react";
import { usePlayerStore } from "@/store/playerStore";

import CurrentSongPlaying from "@/components/CurrentSongPlaying";
import SongControl from "@/components/SongControl";
import VolumeControl from "@/components/VolumeControl";
import Play from "@/icons/Play";
import Pause from "@/icons/Pause";

const Player = (): JSX.Element => {
  const { currentSong, isPlaying, volume, setIsPlaying } = usePlayerStore(
    (state) => state
  );
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    isPlaying ? audioRef.current?.play() : audioRef.current?.pause();
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    const { song, playlist } = currentSong;

    if (song && audioRef.current) {
      const src = `/music/${playlist?.id}/0${song.id}.mp3`;
      audioRef.current.src = src;
      audioRef.current.volume = volume;
      audioRef.current.play();
    }
  }, [currentSong]);

  const handleClick = () => setIsPlaying(!isPlaying);

  return (
    <div className="flex flex-row justify-between items-center w-full h-full px-4 z-50 my-2">
      <div>
        <CurrentSongPlaying
          image={currentSong.song?.image || ""}
          title={currentSong.song?.title || ""}
          artists={currentSong.song?.artists || ""}
        />
      </div>

      <div className="flex-1 grid place-content-center gap-4">
        <div className="flex flex-col justify-center items-center">
          <button className="bg-white rounded-full p-2" onClick={handleClick}>
            {isPlaying ? <Pause /> : <Play />}
          </button>

          <SongControl audio={audioRef} />
        </div>
      </div>

      <div className="grid place-content-center">
        <VolumeControl />
      </div>

      <audio ref={audioRef} />
    </div>
  );
};

export default Player;
