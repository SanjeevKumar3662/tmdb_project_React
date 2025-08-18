// import "./slidingVideos.css";
import { useState, useEffect } from "react";
import VideoCards from "../card/VideoCards";
import Slider from "react-slick";

const SlidingVideos = ({ media_type, id, content_type }) => {
  const [videos, setVideos] = useState("");
  // console.log(media_type,id);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          `https://first-backend-eight.vercel.app/media_content/${media_type}/${id}/${content_type}`
        );
        const data = await response.json();
        content_type === "images" && console.log(data.backdrops[0]);

        setVideos(data);
      } catch (e) {
        console.log("error while fetching media content", e);
      }
    };
    fetchVideos();
  }, [media_type, id, content_type]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 200,
    slidesToShow: content_type === "videos" ?2:3,
    slidesToScroll: 1,
    lazyLoad: true,
    lazyLoadBuffer: 3,
    responsive: [
      {
        breakpoint: 900, // tablets
        settings: {
          slidesToShow: content_type === "videos" ?1:2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 520, // mobile phones
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  content_type === "videos" &&
    videos &&
    videos.results.length <= 1 &&
    (settings.infinite = false);

  return (
    <>
      {/* <h1>nonono</h1> */}
      <Slider {...settings}>
        {content_type === "videos"
          ? videos &&
            videos.results.map((video) => (
              <VideoCards
                type={video.type}
                title={video.name}
                key={video.id}
                videoId={video.key}
              />
            ))
          : videos &&
            videos.backdrops.map((imgs) => (
              // <VideoCards type={video.type} title={video.name} key={video.id} videoId={video.key} />
              // <h2>{imgs.file_path}</h2>
              <img
                className="backdrop"
                loading="lazy"
                src={`https://image.tmdb.org/t/p/w1280${imgs.file_path}`}
                alt=""
              />
            ))}
      </Slider>
    </>
  );
};

export default SlidingVideos;
