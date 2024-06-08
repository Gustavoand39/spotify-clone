import Pause from "@/icons/Pause.tsx";
import Play from "@/icons/Play.tsx";
import { usePlayerStore } from "@/store/playerStore";

interface CardPlayButtonProps {
  id: string;
  size?: "small" | "large";
}

const CardPlayButton = ({
  id,
  size = "small",
}: CardPlayButtonProps): JSX.Element => {
  const { currentSong, isPlaying, setIsPlaying, setCurrentSong } =
    usePlayerStore((state) => state);

  const isPlayingPlaylist = isPlaying && currentSong.playlist?.id === id;

  const handleClick = () => {
    if (isPlayingPlaylist) {
      setIsPlaying(false);
      return;
    }

    fetch(`/api/get-info-playlist.json?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        const { songs, playlist } = data;
        setIsPlaying(true);
        setCurrentSong({ songs, playlist, song: songs[0] });
      });
  };

  const iconClassName = size === "small" ? "w-4 h-4" : "w-5 h-5";

  return (
    <button
      onClick={handleClick}
      className="card-play-button rounded-full bg-green-500 p-4 hover:scale-105 transition hover:bg-green-400"
    >
      {isPlayingPlaylist ? (
        <Pause className={iconClassName} />
      ) : (
        <Play className={iconClassName} />
      )}
    </button>
  );
};

export default CardPlayButton;