import "./App.css";
import Header from "./components/header/Header";
import PopularMovies from "./components/movies/PopularMovies";

function App() {
  return (
    <div className="main-container">
      <Header></Header>
      <PopularMovies></PopularMovies>
      {/* <h1>Hello world</h1> */}
    </div>
  );
}

export default App;
