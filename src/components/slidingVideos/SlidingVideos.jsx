import "./slidingVideos.css";
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
        // content_type === "images" && console.log(data.backdrops[0]);

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
    slidesToShow: content_type === "videos" ? 2 : 3,
    slidesToScroll: 1,
    lazyLoad: true,
    lazyLoadBuffer: 3,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: content_type === "videos" ? 1 : 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 520,
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
      <Slider {...settings}>
        {(() => {
          switch (content_type) {
            case "videos":
              return (
                videos &&
                videos.results.map((video) => (
                  <VideoCards
                    type={video.type}
                    title={video.name}
                    key={video.id}
                    videoId={video.key}
                  />
                ))
              );
            case "images":
              return (
                videos &&
                videos.backdrops.map((imgs) => (
                  <div className="backdrop-border">
                    <img
                      className="backdrops"
                      loading="lazy"
                      src={`https://image.tmdb.org/t/p/w780${imgs.file_path}`}
                      alt=""
                    />
                  </div>
                ))
              );
          }
        })()}
      </Slider>
    </>
  );
};

export default SlidingVideos;
