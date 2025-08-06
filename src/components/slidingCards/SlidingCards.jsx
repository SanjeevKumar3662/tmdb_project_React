import "./slidingCards.css";
import Card from "../../components/card/Card";
import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";

//for slider
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//slider end

const SlidingCards = () => {
  const [movies, setMovies] = useState(null);

  const page = 1;

  useEffect(() => {
    try {
      const fetchMovies = async () => {
        const res = await fetch(
          `https://first-backend-eight.vercel.app/popular_movies?page=${page}`
        );
        const data = await res.json();
        // console.log(data.results[0]);

        setMovies(data.results);
      };
      fetchMovies();
    } catch (error) {
      console.log(error);
    }


  }, [page]);

  // console.log(movies[0]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
  };

  return (
    <>
      <Slider {...settings}>
        {movies ? (
          movies.map((movie) => (
            <div key={movie.id}>
              <Card page={page} cssClass={"sliding-cards"} {...movie}></Card>
            </div>
          ))
        ) : (
          <h1>Loading...</h1>
        )}
      </Slider>
    </>
  );
};
export default SlidingCards;
