import "./PopularTvShows.css";
import Card from "../../components/card/Card";
import PageNav from "../../components/pageNav/PageNav";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const PopularTvShows = () => {
  const [TvShows, setPopTvShows] = useState(null);

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
      const fetchTvShows = async () => {
        const res = await fetch(
          `https://first-backend-eight.vercel.app/popular_tv?page=${page}`
        );
        const data = await res.json();

        //use this for checking the obj's properties
        console.log("pop-tv", data.results[0]);

        setPopTvShows(data.results);
      };
      fetchTvShows();
    } catch (error) {
      console.log(error);
    }

    //this will scroll to top
    window.scrollTo({ top: 0 });
  }, [page]);

  // console.log(TvShows);

  return (
    <div className="movie-container">
      <h1>Popular TV Shows</h1>
      <div className="flex-container">
        {TvShows ? (
          TvShows.map((tvShow) => <Card key={tvShow.id} page={page} {...tvShow}></Card>)
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
export default PopularTvShows;
