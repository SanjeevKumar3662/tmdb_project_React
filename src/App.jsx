import { Analytics } from "@vercel/analytics/react"; //vercel analytics
import { SpeedInsights } from "@vercel/speed-insights/react"; //vercel SpeedInsights

import { Route, Routes } from "react-router-dom";

import "./App.css";
import Header from "./components/header/Header";
import MediaLists from "./pages/media/MediaLists";
// import PopularTvShows from "./pages/tvShows/PopularTvShows";
import MovieDetails from "./pages/media/MediaDetails";
// import TvShowDetails from "./pages/tvShows/TvShowDetails";
import HomePage from "./pages/homePage/HomePage";

import { ShutDown } from "./pages/homePage/ShutDown";
import SearchPage from "./pages/search/SearchPage";

function App() {
  // const location = useLocation();
  // const isDetails =
  //   location.pathname.startsWith("/movie_details") ||
  //   location.pathname.startsWith("/tv_shows_details");

  const isSiteDown = false;

  return (
    <>
      {/* if details then no header */}
      {<Header></Header>}

      <Routes>
        <Route path="/" element={isSiteDown ? <ShutDown /> : <HomePage />} />

        <Route
          path="/movie/now_playing"
          element={
            <MediaLists
              media_type={"movie"}
              list_type={"now_playing"}
              headerText={"Now Playing Movies"}
            />
          }
        />
        <Route
          path="/movie/popular"
          element={
            <MediaLists
              media_type={"movie"}
              list_type={"popular"}
              headerText={"Popular Movies"}
            />
          }
        />
        <Route
          path="/movie/top_rated"
          element={
            <MediaLists
              media_type={"movie"}
              list_type={"top_rated"}
              headerText={"Top Rated Movies"}
            />
          }
        />
        <Route
          path="/movie/upcoming"
          element={
            <MediaLists
              media_type={"movie"}
              list_type={"upcoming"}
              headerText={"Upcomming Movies"}
            />
          }
        />

        <Route
          path="/tv/airing_today"
          element={
            <MediaLists
              media_type={"tv"}
              list_type={"airing_today"}
              headerText={"Airing Today - TV"}
            />
          }
        />
        <Route
          path="/tv/on_the_air"
          element={
            <MediaLists
              media_type={"tv"}
              list_type={"on_the_air"}
              headerText={"On The Air - TV"}
            />
          }
        />
        <Route
          path="/tv/popular"
          element={
            <MediaLists
              media_type={"tv"}
              list_type={"popular"}
              headerText={"Popular - TV"}
            />
          }
        />
        <Route
          path="/tv/top_rated"
          element={
            <MediaLists
              media_type={"tv"}
              list_type={"top_rated"}
              headerText={"Top Rated - TV"}
            />
          }
        />

        <Route
          path="/movie_details/:page/:id"
          element={<MovieDetails media_type={"movie"} />}
        />
        <Route
          path="/tv_shows_details/:page/:id"
          element={<MovieDetails media_type={"tv"} />}
        />
        <Route path="/search/:query" element={<SearchPage />} />
      </Routes>

      <SpeedInsights />
      <Analytics />
    </>
  );
}

export default App;
