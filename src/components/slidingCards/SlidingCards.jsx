import "./slidingCards.css";
import Card from "../../components/card/Card";
import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";

//for slider
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//slider end

const SlidingCards = ({ media_type, list_type, credits }) => {
  const [movies, setMovies] = useState(null);
  // const [content, setContent] = useState(null);
  const page = 1;

  useEffect(() => {
    try {
      const fetchMovies = async () => {
        const res = await fetch(
          `https://first-backend-eight.vercel.app/media_lists/${media_type}/${list_type}/${page}`
        );
        const data = await res.json();
        // console.log(data.results[0]);

        setMovies(data.results);
      };

      !credits && fetchMovies();// won't call this, if we want cast info
      
    } catch (error) {
      console.log(error);
    }
  });

  // console.log(movies[0]);

  // const settings = {
  //   dots: false,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 7,
  //   slidesToScroll: 5,
  // };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 5,
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
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 480, // mobile phones
        settings: {
          slidesToShow: 2.05,
          slidesToScroll: 2,
        },
      },
    ],
  };

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

        {media_type === "credits" && credits ? (
          credits.map((person) => (
            <Card key={person.id} cssClass={"sliding-cards"} {...person}></Card>
          ))
        ) : (
          <h1>Loading...</h1>
        )}
      </Slider>
    </>
  );
};
export default SlidingCards;
