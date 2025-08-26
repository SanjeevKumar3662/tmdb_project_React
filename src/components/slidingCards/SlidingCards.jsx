import "./slidingCards.css";
import Card from "../../components/card/Card";
import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import SlidingVideos from "../../components/slidingVideos/SlidingVideos";

//for slider
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//slider end

const SlidingCards = ({ media_type, list_type, credits, videos ,otherData, isFetch=true}) => {
  const [movies, setMovies] = useState(null);
  // const [infiniteScroll, setInfiniteScroll] = useState(true);
  // infiniteScroll && credits.length <= 8 && setInfiniteScroll(false);
  const page = 1;

  otherData && console.log(otherData[0]);

  useEffect(() => {
    try {
      const fetchMovies = async () => {
        const res = await fetch(
          `https://first-backend-eight.vercel.app/media_lists/${media_type}/${list_type}/${page}`
        );
        const data = await res.json();
        // console.log(media_type,data.results);

        setMovies(data.results);
      };

      !credits && isFetch && fetchMovies(); // won't call this, if we want cast info
    } catch (error) {
      console.log(error);
    }
  }, [media_type, list_type, page, credits]);

  // console.log(movies[0]);

  const settings = {
    dots: false,
    infinite: credits && credits.length <= 8 ? false : true,
    speed: 200,
    slidesToShow: 8,
    slidesToScroll: 5,
    lazyLoad: videos ? false : true,
    lazyLoadBuffer: 3,
    responsive: [
      {
        breakpoint: 1350, // tablets
        settings: {
          slidesToShow: 6,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1024, // tablets
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768, // small tablets / large phones
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 550, // tablets
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 420, // mobile phones
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  // credits && console.log("this", credits.length);
  return (
    <>
      <Slider {...settings}>
        {movies &&
          media_type !== "credits" &&
          movies.map((movie) => (
            <div key={movie.id}>
              <Card page={page} cssClass={"sliding-cards"} {...movie}></Card>
            </div>
          ))}
        {otherData &&
          otherData.map((movie) => (
            <div key={movie.id}>
              <Card page={page} cssClass={"sliding-cards"} {...movie}></Card>
            </div>
          ))}

        {media_type === "credits" &&
          credits &&
          credits.map((person) => (
            <div key={person.id}>
              <Card cssClass={"sliding-cards"} {...person}></Card>
            </div>
          ))}
      </Slider>
    </>
  );
};
export default SlidingCards;
