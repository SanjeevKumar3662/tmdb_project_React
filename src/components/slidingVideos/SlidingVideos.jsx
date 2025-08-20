import "./slidingVideos.css";
import { useState, useEffect } from "react";
import VideoCards from "../card/VideoCards";
import Slider from "react-slick";
import Card from "../card/Card";

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

  const getSlidesToShow = (type, breakpoint = "default") => {
    switch (breakpoint) {
      case "desktop":
        switch (type) {
          case "videos":
            return 2;
          case "images":
            return 3;
          case "recommendations":
            return 8;
          default:
            return 3;
        }
      case 1200:
        switch (type) {
          case "videos":
            return 1;
          case "images":
            return 2;
          case "recommendations":
            return 4;
          default:
            return 3;
        }
      case 520:
        switch (type) {
          case "videos":
            return 1;
          case "images":
            return 1;
          case "recommendations":
            return 2;
          default:
            return 3;
        }

      
    }
  };
// content_type === "videos" ? 2 : 3,
  const settings = {
    dots: false,
    infinite: true,
    speed: 200,
    slidesToShow: getSlidesToShow(content_type,"desktop"),
    slidesToScroll: content_type==="recommendations"?4:1,
    lazyLoad: true,
    lazyLoadBuffer: 3,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: getSlidesToShow(content_type,1200),
          slidesToScroll: content_type==="recommendations"?2:1,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: getSlidesToShow(content_type,520),
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
            case "recommendations":
              return (
                videos &&
                videos.results.map((media) => (
                  <Card cssClass={"sliding-cards"} {...media} />
                ))
              );
          }
        })()}
      </Slider>
    </>
  );
};

export default SlidingVideos;
