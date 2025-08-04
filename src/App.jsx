import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/header/Header";
import PopularMovies from "./pages/movies/PopularMovies";
import PopularTvShows from "./pages/tvShows/PopularTvShows";
import MovieDetails from "./pages/movies/MovieDetails";
import TvShowDetails from "./pages/tvShows/TvShowDetails";

function App() {
  const location = useLocation();

  const isDetailsPage =
    location.pathname.startsWith("/movie_details") ||
    location.pathname.startsWith("/tv_shows_details");

  return (
    <div className="main-container">
      {!isDetailsPage && <Header></Header>}
      <Routes>
        <Route path="/" element={<PopularMovies />} />
        <Route path="/popular_tv_shows/" element={<PopularTvShows />} />
        <Route path="/movie_details/:page/:id" element={<MovieDetails />} />
        <Route path="/tv_shows_details/:page/:id" element={<TvShowDetails />} />
      </Routes>
    </div>
  );
}

export default App;
