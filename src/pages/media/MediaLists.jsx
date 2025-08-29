import "./mediaLists.css";
import Card from "../../components/card/Card";
import PageNav from "../../components/pageNav/PageNav";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const MediaLists = ({ media_type, list_type, headerText }) => {
  const [movies, setMovies] = useState(null);

  
  const [searchParams, setSearchParams] = useSearchParams();

  // get values from URL
  const pageFromURL = parseInt(searchParams.get("page") || 1);
  const listTypeFromURL = searchParams.get("list_type") || list_type;

  // local state
  const [page, setPage] = useState(pageFromURL);
  const [currentListType, setCurrentListType] = useState(listTypeFromURL);

  // keep URL in sync (MERGE params instead of overwriting)
  useEffect(() => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set("page", page);
      newParams.set("list_type", currentListType);
      return newParams;
    });
  }, [page, currentListType, setSearchParams]);

  // reset page only when list_type changes
  useEffect(() => {
    if (list_type !== currentListType) {
      setCurrentListType(list_type);
      setPage(1);
    }
  }, [list_type]);


  useEffect(() => {
    try {
      const fetchMovies = async () => {
        const res = await fetch(
          `https://first-backend-eight.vercel.app/media_lists/${media_type}/${list_type}/${page}`
        );
        const data = await res.json();
        // console.log("pop-movie", data.results[0]);

        setMovies(data.results);
      };
      fetchMovies();
    } catch (error) {
      console.log(error);
    }

    //this will scroll to top
    window.scrollTo({ top: 0 });
  }, [page, media_type, list_type]);

  // console.log(movies[0]);
  return (
    <div className="movie-container">
      <h1>{headerText}</h1>
      <PageNav
        prevClick={() => setPage(page > 1 ? () => page - 1 : page)}
        nextClick={() => setPage(() => page + 1)}
        page={page}
        setPage={setPage}
      ></PageNav>
      <div className="flex-container">
        {movies ? (
          movies.map((movie) => (
            <Card
              key={movie.id}
              page={page}
              cssClass={"card"}
              linkTo={media_type+"_details"}
              list_type={list_type}
              {...movie}
            ></Card>
          ))
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
export default MediaLists;
