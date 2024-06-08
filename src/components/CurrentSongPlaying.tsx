import type { FC } from "react";

interface CurrentSongPlayingProps {
  image: string;
  title: string;
  artists: string | string[];
}

const CurrentSongPlaying: FC<CurrentSongPlayingProps> = ({
  image,
  title,
  artists,
}): JSX.Element => {
  return (
    <div className="min-w-44 flex items-center gap-5 relative overflow-hidden">
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

export default CurrentSongPlaying;
