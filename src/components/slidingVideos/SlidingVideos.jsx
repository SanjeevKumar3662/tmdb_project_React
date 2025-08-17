// import "./slidingVideos.css";
import { useState, useEffect } from "react";
import VideoCards from "../card/VideoCards";
import Slider from "react-slick";

const SlidingVideos = ({ media_type, id }) => {
  const [videos, setVideos] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          `https://first-backend-eight.vercel.app/media_content/${media_type}/${id}/videos`
        );
        const data = await response.json();
        console.log(data.results[0]);

        setVideos(data);
      } catch (e) {
        console.log("error while fetching media content", e);
      }
    };
    fetchVideos();
  }, [media_type, id]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 200,
    slidesToShow: 2,
    slidesToScroll: 1,
    lazyLoad: true,
    lazyLoadBuffer: 3,
    responsive: [
      {
        breakpoint: 900, // tablets
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 420, // mobile phones
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  videos && videos.results.length <= 1 && (settings.infinite = false);

  return (
    <>
      {/* <h1>nonono</h1> */}
      <Slider {...settings}>
        {videos &&
          videos.results.map((video) => (
            <VideoCards type={video.type} title={video.name} key={video.id} videoId={video.key} />
          ))}
      </Slider>
    </>
  );
};

export default SlidingVideos;
