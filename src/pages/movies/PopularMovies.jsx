import "./PopularMovies.css";
import { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import PageNav from "../../components/PageNav";

const PopularMovies = () => {
  const [movies, setMovies] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    try {
      const fetchMovies = async () => {
        const res = await fetch(
          `https://first-backend-eight.vercel.app/popular_movies?page=${page}`
        );
        const data = await res.json();
        console.log(data.results[0]);

        setMovies(data.results);
      };
      fetchMovies();
    } catch (error) {
      console.log(error);
    }

    //this will scroll to top
    window.scrollTo({ top: 0 });
  }, [page]);

  // console.log(movies[0]);
  return (
    <div className="movie-container">
      <h1>Popular Movies</h1>
      <div className="flex-container">
        {movies ? (
          movies.map((movie) => <Card key={movie.id} {...movie}></Card>)
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
      <PageNav
        prevClick={() => setPage(page > 1 ? () => page - 1 : page)}
        nextClick={() => setPage(() => page + 1)}
        page={page}
      ></PageNav>
    </div>
  );
};
export default PopularMovies;
