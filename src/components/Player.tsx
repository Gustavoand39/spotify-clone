import { usePlayerStore } from "@/store/playerStore";
import { useEffect, useRef } from "react";
import { Slider } from "./Slider";

export const Pause = ({ className }: { className?: string }) => (
  <svg
    className={className}
    role="img"
    height="16"
    width="16"
    aria-hidden="true"
    viewBox="0 0 16 16"
  >
    <path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
  </svg>
);

export const Play = ({ className }: { className?: string }) => (
  <svg
    className={className}
    role="img"
    height="16"
    width="16"
    aria-hidden="true"
    viewBox="0 0 16 16"
  >
    <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
  </svg>
);

const CurrentSongPlaying = ({
  image,
  title,
  artists,
}: {
  image: string;
  title: string;
  artists: string | string[];
}) => {
  return (
    <div className="flex items-center gap-5 relative overflow-hidden">
      <picture className="w-16 h-16 bg-zinc-800 rounded-md shadow-lg overflow-hidden">
        <img src={image} alt={title} />
      </picture>

      <div className="flex flex-col">
        <h3 className="font-semibold text-sm block">
          {title.length > 20 ? `${title.slice(0, 20)}...` : title}
        </h3>

        {
          <p className="text-xs text-zinc-400">
            {Array.isArray(artists)
              ? artists.join(", ").length > 20
                ? `${artists.join(", ").slice(0, 20)}...`
                : artists.join(", ")
              : artists.length > 20
              ? `${artists.slice(0, 20)}...`
              : artists}
          </p>
        }
      </div>
    </div>
  );
};

const Player = (): JSX.Element => {
  const { currentSong, isPlaying, setIsPlaying } = usePlayerStore(
    (state) => state
  );
  const audioRef = useRef<HTMLAudioElement>(null);
  const volumeRef = useRef<number>(1);

  useEffect(() => {
    isPlaying ? audioRef.current?.play() : audioRef.current?.pause();
  }, [isPlaying]);

  useEffect(() => {
    const { song, playlist, songs } = currentSong;

    if (song && audioRef.current) {
      const src = `/music/${playlist?.id}/0${song.id}.mp3`;
      audioRef.current.src = src;
      audioRef.current.volume = volumeRef.current;
      audioRef.current.play();
    }
  }, [currentSong]);

  const handleClick = () => setIsPlaying(!isPlaying);

  return (
    <div className="flex flex-row justify-between items-center w-full h-full px-4 z-50">
      <div>
        <CurrentSongPlaying
          image={currentSong.song?.image || ""}
          title={currentSong.song?.title || ""}
          artists={currentSong.song?.artists || ""}
        />
      </div>

      <div className="flex-1 grid place-content-center gap-4">
        <div className="flex justify-center">
          <button className="bg-white rounded-full p-2" onClick={handleClick}>
            {isPlaying ? <Pause /> : <Play />}
          </button>
        </div>
      </div>

      <div className="grid place-content-center">
        <Slider
          defaultValue={[100]}
          max={100}
          min={0}
          className="w-24"
          onValueChange={(value) => {
            if (audioRef.current) {
              const [newVolume] = value;
              const volumeValue = newVolume / 100;
              volumeRef.current = volumeValue;
              audioRef.current.volume = volumeValue;
            }
          }}
        />
      </div>

      <audio ref={audioRef} />
    </div>
  );
};

export default Player;
