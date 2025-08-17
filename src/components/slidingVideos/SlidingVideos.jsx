import "./slidingVideos.css";
import { useState } from "react";

const SlidingVideos = ({ videoId, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Thumbnail URL from YouTube
  const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <>
      {/* <h1>nonono</h1> */}
      <div className="lite-video-wrapper">
        {!isPlaying ? (
          <div className="video-thumbnail" onClick={() => setIsPlaying(true)}>
            {/* Thumbnail Image */}
            <img
              src={thumbnail}
              alt={title}
              className="thumbnail-img"
              loading="lazy"
              // decoding="async"
            />

            {/* Fake Play Button */}
            <div className="play-button">▶</div>
          </div>
        ) : (
          // Real iframe only when clicked
          <iframe
            className="video-player"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            loading="lazy"
            title={title}
          ></iframe>
        )}
      </div>
    </>
  );
};

export default SlidingVideos;
