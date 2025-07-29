import "./PopularMovies.css";
import { useEffect, useState } from "react";
import Card from "../card/Card";

const PopularMovies = () => {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    try {
      const fetchMovies = async () => {
        // const url =
        //   "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
        // const options = {
        //   method: "GET",
        //   headers: {
        //     accept: "application/json",
        //     Authorization:
        //       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZTMzNTc5NTAzZDgyN2NlMjJjNjI3NTgwMTU5ZTZlNiIsIm5iZiI6MTcyNzc1NzQwMS44MjIsInN1YiI6IjY2ZmI3YzU5ZDgwNjQxNjViZGYxNmFjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bQSwgX4n_teHX61idIJa9N0v5BLYh8tdL374pRU9HxY",
        //   },
        // };

        const res = await fetch("https://first-backend-eight.vercel.app/popular_movies");
        const data = await res.json();
        console.log(data.results[0]);

        setMovies(data.results);
      };
      fetchMovies();
    } catch (error) {
      console.log(error);
    }
  }, []);
  // console.log(movies[0]);
  return (
    <div className="movie-container">
      <h1>Popular Movies</h1>
      <div className="flex-container">
        {movies ? (
          movies.map((movie) => <Card {...movie}></Card>)
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </div>
  );
};
export default PopularMovies;
