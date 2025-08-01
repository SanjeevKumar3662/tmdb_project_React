import "./App.css";
import { HashRouter, Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import PopularMovies from "./pages/movies/PopularMovies";
import PopularTvShows from "./pages/tvShows/PopularTvShows";
import MovieDetails from "./pages/movies/MovieDetails";

function App() {
  return (
    <HashRouter>
      <div className="main-container">
        <Header></Header>
        {/* <PopularMovies></PopularMovies> */}
        {/* <PopularTvShows></PopularTvShows> */}
        <Routes>
          <Route path="/" element={<PopularMovies />} />
          <Route path="/popular_tv_shows/" element={<PopularTvShows />} />
          <Route path="/movie_details/:id" element={<MovieDetails/>}/>
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
