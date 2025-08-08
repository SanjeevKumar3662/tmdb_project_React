import { useLocation, Route, Routes } from "react-router-dom";

import "./App.css";
import Header from "./components/header/Header";
import PopularMovies from "./pages/movies/PopularMovies";
import PopularTvShows from "./pages/tvShows/PopularTvShows";
import MovieDetails from "./pages/movies/MovieDetails";
import TvShowDetails from "./pages/tvShows/TvShowDetails";
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
        <Route path="/popular_moives" element={<PopularMovies media_type={"movie"} list_type={"popular"}/>} />
        <Route path="/popular_tv_shows/" element={<PopularTvShows media_type={"tv"} list_type={"popular"} />} />
        <Route path="/movie_details/:page/:id" element={<MovieDetails media_type={"movie"} />} />
        <Route path="/tv_shows_details/:page/:id" element={<MovieDetails media_type={"tv"} />} />
      </Routes>
    </>
  );
}

export default App;
