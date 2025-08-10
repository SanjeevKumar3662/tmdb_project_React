import { Analytics } from "@vercel/analytics/react" //vercel analytics
import { SpeedInsights } from "@vercel/speed-insights/react" //vercel SpeedInsights


import { useLocation, Route, Routes } from "react-router-dom";

import "./App.css";
import Header from "./components/header/Header";
import MediaLists from "./pages/media/MediaLists";
// import PopularTvShows from "./pages/tvShows/PopularTvShows";
import MovieDetails from "./pages/media/MediaDetails";
// import TvShowDetails from "./pages/tvShows/TvShowDetails";
import HomePage from "./pages/homePage/HomePage";

import { ShutDown } from "./pages/homePage/ShutDown";

function App() {
  const location = useLocation();
  const isDetails =
    location.pathname.startsWith("/movie_details") ||
    location.pathname.startsWith("/tv_shows_details");


    const isSiteDown = false;

  return (
    <>
      {/* if details then no header */}
      {!isDetails && <Header></Header>}

      <Routes>
        <Route path="/" element={isSiteDown?<ShutDown/>:<HomePage/>} />

        <Route path="/now_playing_movies" element={<MediaLists media_type={"movie"} list_type={"now_playing"}/>} />
        <Route path="/popular_movies" element={<MediaLists media_type={"movie"} list_type={"popular"}/>} />
        <Route path="/top_rated_movies" element={<MediaLists media_type={"movie"} list_type={"top_rated"}/>} />
        <Route path="/upcoming_movies" element={<MediaLists media_type={"movie"} list_type={"upcoming"}/>} />

        <Route path="/popular_tv_shows/" element={<MediaLists media_type={"tv"} list_type={"popular"} />} />

        <Route path="/movie_details/:page/:id" element={<MovieDetails media_type={"movie"} />} />
        <Route path="/tv_shows_details/:page/:id" element={<MovieDetails media_type={"tv"} />} />
      </Routes>

      <SpeedInsights/>
      <Analytics/>
    </>
  );
}

export default App;
