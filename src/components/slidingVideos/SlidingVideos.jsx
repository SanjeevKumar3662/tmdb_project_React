import "./slidingVideos.css";

const SlidingVideos = ({videoId}) => {
  return (
    <>
    {/* <h1>nonono</h1> */}
    <iframe
      className="video-player"
      src={`https://www.youtube.com/embed/${videoId}`}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
      ></iframe>
      </>
  );
};

export default SlidingVideos;
