import "./mediaContentSlider.css";
// import { useState, useEffect } from "react";
import VideoCards from "../card/VideoCards";
import Slider from "react-slick";
import Card from "../card/Card";
import { useQuery } from "@tanstack/react-query";

const MediaContentSlider = ({ media_type, id, content_type }) => {
  const { data: contentData } = useQuery({
    queryKey: [media_type, id, content_type],
    queryFn: fetchContentData,
  });

  async function fetchContentData() {
    const response = await fetch(
      `https://first-backend-eight.vercel.app/media_content/${media_type}/${id}/${content_type}`
    );
    return await await response.json();
  }

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
  
  const settings = {
    dots: false,
    infinite: true,
    speed: 200,
    slidesToShow: getSlidesToShow(content_type, "desktop"),
    slidesToScroll: content_type === "recommendations" ? 4 : 1,
    lazyLoad: true,
    lazyLoadBuffer: 3,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: getSlidesToShow(content_type, 1200),
          slidesToScroll: content_type === "recommendations" ? 2 : 1,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: getSlidesToShow(content_type, 520),
          slidesToScroll: 1,
        },
      },
    ],
  };

  contentData &&
    (() => {
      switch (content_type) {
        case "images":
          contentData.backdrops.length <= 1 && (settings.infinite = false);
          break;
        case "videos":
          contentData.results.length <= 1 && (settings.infinite = false);
          break;
      }
    })();

  return (
    <>
      <Slider {...settings}>
        {(() => {
          switch (content_type) {
            case "videos":
              return (
                contentData &&
                contentData.results.map((video) => (
                  <VideoCards
                    type={video.type}
                    title={video.name}
                    key={video.id}
                    videoId={video.key}
                    mediaId={id}
                  />
                ))
              );
            case "images":
              return (
                contentData &&
                contentData.backdrops.map((imgs) => (
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
                contentData &&
                contentData.results.map((media) => (
                  <Card
                    cssClass={"sliding-cards"}
                    {...media}
                    linkTo={media_type + "_details"}
                  />
                ))
              );
          }
        })()}
      </Slider>
    </>
  );
};

export default MediaContentSlider;
