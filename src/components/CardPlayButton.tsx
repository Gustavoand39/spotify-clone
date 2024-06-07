import type { FC } from "react";
import { Pause, Play } from "./Player";

interface CardPlayButtonProps {
  id: string;
}

const CardPlayButton: FC<CardPlayButtonProps> = ({ id }) => {
  return (
    <div className="card-play-button rounded-full bg-green-500 p-4">
      <Play />
    </div>
  );
};

export default CardPlayButton;
