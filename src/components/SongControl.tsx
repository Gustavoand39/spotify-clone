import { useEffect, useState, type FC } from "react";
import { Slider } from "@/components/Slider";

interface SongControlProps {
  audio: React.RefObject<HTMLAudioElement>;
}

const SongControl: FC<SongControlProps> = ({ audio }) => {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (audio.current)
      audio.current.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      if (audio.current)
        audio.current.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  const handleTimeUpdate = () => {
    if (audio.current) setCurrentTime(audio.current.currentTime);
  };

  const formatTime = (time: number) => {
    if (time == null) return `0:00`;

    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const duration = audio?.current?.duration ?? 0;

  return (
    <div className="flex gap-x-3 text-xs pt-2">
      <span className="opacity-50 w-12 text-right">
        {formatTime(currentTime)}
      </span>

      <Slider
        value={[currentTime]}
        max={audio?.current?.duration ?? 0}
        min={0}
        className="w-[500px]"
        onValueChange={(value) => {
          const [newCurrentTime] = value;
          if (audio.current) audio.current.currentTime = newCurrentTime;
        }}
      />

      <span className="opacity-50 w-12">
        {duration ? formatTime(duration) : "0:00"}
      </span>
    </div>
  );
};

export default SongControl;
