import { useRef } from "react";
import { usePlayerStore } from "@/store/playerStore";

import { Slider } from "./Slider";
import VolumeSilence from "@/icons/VolumeSilence";
import Volume from "@/icons/Volume";

const VolumeControl = (): JSX.Element => {
  const [volume, setVolume] = usePlayerStore((state) => [
    state.volume,
    state.setVolume,
  ]);
  const prevVolumeRef = useRef(volume);
  const isVolumeMuted = volume < 0.1;

  const handleClickVolume = (): void => {
    if (isVolumeMuted) {
      setVolume(prevVolumeRef.current);
      return;
    }
    prevVolumeRef.current = volume;
    setVolume(0);
  };

  return (
    <div className="flex justify-center items-center gap-1 text-white">
      <button
        className="opacity-80 hover:opacity-100 rounded-lg p-1"
        onClick={handleClickVolume}
      >
        {volume === 0 ? <VolumeSilence /> : <Volume />}
      </button>

      <Slider
        defaultValue={[100]}
        max={100}
        min={0}
        value={[volume * 100]}
        className="w-24"
        onValueChange={(value) => {
          const [newVolume] = value;
          const volumeValue = newVolume / 100;
          setVolume(volumeValue);
        }}
      />
    </div>
  );
};

export default VolumeControl;
