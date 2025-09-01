import "./mediaLists.css";
import Card from "../../components/card/Card";
import PageNav from "../../components/pageNav/PageNav";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const MediaLists = ({ media_type, list_type, headerText }) => {
  //  const [movies, setMovies] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // get initial page from URL
  const pageFromURL = parseInt(searchParams.get("page") || 1);
  const [page, setPage] = useState(pageFromURL);

  // --- keep URL in sync (merge instead of overwrite) ---
  useEffect(() => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("page", page);
      newParams.set("list_type", list_type); // always from props
      return newParams;
    });
  }, [page, list_type, setSearchParams]);

  // --- reset page when media_type OR list_type changes ---
  const prevKeyRef = useRef();

  useEffect(() => {
    const newKey = `${media_type}-${list_type}`;
    if (prevKeyRef.current && prevKeyRef.current !== newKey) {
      setPage(1); // reset page
    }
    prevKeyRef.current = newKey;
  }, [media_type, list_type]);

  const {
    data: movies,
    isPending,
    isError,
  } = useQuery({
    queryKey: [media_type, list_type, page],
    queryFn: fetchMovies,
  });

  async function fetchMovies() {
    const response = await fetch(
      `https://first-backend-eight.vercel.app/media_lists/${media_type}/${list_type}/${page}`
    );
    const data = await response.json();
    return await data.results;
  }

  if (isPending) {
    return (
      <div
        style={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span className="loader"></span>
      </div>
    );
  }

  if (isError) {
    return <div>Error in media details page</div>;
  }

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
              linkTo={media_type + "_details"}
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
