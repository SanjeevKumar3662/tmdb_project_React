import "./PopularTvShows.css";
import { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import PageNav from "../../components/pageNav/PageNav";

const PopularTvShows = () => {
  const [TvShows, setPopTvShows] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    try {
      const fetchTvShows = async () => {
        const res = await fetch(
          `https://first-backend-eight.vercel.app/popular_tv?page=${page}`
        );
        const data = await res.json();

        //use this for checking the obj's properties
        // console.log(data.results[0]);

        setPopTvShows(data.results);
      };
      fetchTvShows();
    } catch (error) {
      console.log(error);
    }

    //this will scroll to top
    window.scrollTo({ top: 0 });
  }, [page]);
  // console.log(TvShows[0]);
  return (
    <div className="movie-container">
      <h1>Popular TV Shows</h1>
      <div className="flex-container">
        {TvShows ? (
          TvShows.map((tvShow) => <Card key={tvShow.id} {...tvShow}></Card>)
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
export default PopularTvShows;
