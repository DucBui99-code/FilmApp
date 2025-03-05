import { useState } from 'react';

const VideoPlayer = ({ linkEmbed, thumbnail }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className={`relative ${!isPlaying && 'rounded-lg'}`}>
      {!isPlaying ? (
        <div
          className="cursor-pointer relative"
          onClick={() => setIsPlaying(true)}
        >
          <img
            src={thumbnail}
            srcSet={thumbnail}
            loading="lazy"
            alt="Movie Thumbnail"
            className="w-full h-[600px] object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <button className="text-white text-4xl">▶</button>
          </div>
        </div>
      ) : (
        <iframe
          src={linkEmbed}
          width="100%"
          height="600"
          frameBorder="0"
          allow="autoplay; fullscreen"
          title="Movie"
        ></iframe>
      )}
    </div>
  );
};

export default VideoPlayer;
