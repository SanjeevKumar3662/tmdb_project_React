import "./PopularMovies.css";
import { useEffect, useState } from "react";
import Card from "../../components/card/Card";

const PopularMovies = () => {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    try {
      const fetchMovies = async () => {
        const res = await fetch(
          "https://first-backend-eight.vercel.app/popular_movies"
        );
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
          movies.map((movie) => <Card key={movie.key} {...movie}></Card>)
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </div>
  );
};
export default PopularMovies;
