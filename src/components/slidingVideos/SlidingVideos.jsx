import "./slidingVideos.css";

const SlidingVideos = ({ videoId, title }) => {
  return (
    <>
      {/* <h1>nonono</h1> */}
      <iframe
        className="video-player"
        src={`https://www.youtube.com/embed/${videoId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        loading="lazy"
        title={title}
      ></iframe>
    </>
  );
};

export default SlidingVideos;
