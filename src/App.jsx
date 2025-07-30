import "./App.css";
import { HashRouter, Router, Route } from "react-router-dom";
import Header from "./components/header/Header";
import PopularMovies from "./components/movies/PopularMovies";
import PopularTvShows from "./components/tvShows/PopularTvShows";

function App() {
  return (
    <div className="main-container">
      <Header></Header>
      {/* <PopularMovies></PopularMovies> */}
      <PopularTvShows></PopularTvShows>
      {/* <h1>Hello world</h1> */}
    </div>
  );
}

export default App;
