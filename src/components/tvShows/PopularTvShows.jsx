import "./PopularTvShows.css";
import { useEffect, useState } from "react";
import Card from "../card/Card";

const PopularTvShows = () => {
  const [TvShows, setPopTvShows] = useState(null);

  useEffect(() => {
    try {
      const fetchTvShows = async () => {
        const res = await fetch(
          "https://first-backend-eight.vercel.app/popular_tv"
        );
        const data = await res.json();
        console.log(data.results[0]);

        setPopTvShows(data.results);
      };
      fetchTvShows();
    } catch (error) {
      console.log(error);
    }
  }, []);
  // console.log(TvShows[0]);
  return (
    <div className="movie-container">
      <h1>Popular TvShows</h1>
      <div className="flex-container">
        {TvShows ? (
          TvShows.map((tvShow) => <Card key={tvShow.id} {...tvShow}></Card>)
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </div>
  );
};
export default PopularTvShows;
