import "./PopularMovies.css";
import { useEffect, useState } from "react";
import Card from "../../components/card/Card";

const PopularMovies = () => {
  const [movies, setMovies] = useState(null);
  const [page, setPage] = useState(1);

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
          movies.map((movie) => <Card key={movie.id} {...movie}></Card>)
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
      <section className="page-nav">
        <button onClick={()=>setPage(page>1?()=>page-1:page)}>Prev</button>
        <span>Current Page {page}</span>
        <button onClick={()=>setPage(()=>page+1)}>Next</button>
      </section>
    </div>
  );
};
export default PopularMovies;
