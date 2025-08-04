import "./PopularMovies.css";
import Card from "../../components/card/Card";
import PageNav from "../../components/pageNav/PageNav";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const PopularMovies = () => {
  const [movies, setMovies] = useState(null);

  //for getting page from url
  const [searchParams, setSearchParams] = useSearchParams(); //used to read query params from url
  //this returns a string so parse it
  const pageFromURL = parseInt(searchParams.get("page") || 1);
  const [page, setPage] = useState(pageFromURL);

  useEffect(() => {
    setSearchParams({ page }); //updates the page sting in url
  }, [page, setSearchParams]);
  //end

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

    //this will scroll to top
    window.scrollTo({ top: 0 });
  }, [page]);

  // console.log(movies[0]);
  return (
    <div className="movie-container">
      <h1>Popular Movies</h1>
      <div className="flex-container">
        {movies ? (
          movies.map((movie) => <Card key={movie.id} page={page} {...movie}></Card>)
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
      <PageNav
        prevClick={() => setPage(page > 1 ? () => page - 1 : page)}
        nextClick={() => setPage(() => page + 1)}
        page={page}
        setPage={setPage}
      ></PageNav>
    </div>
  );
};
export default PopularMovies;
