import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header className="header-container">
      <div className="left-header">
        <Link to={"/"}>
          <button className="btn">Home</button>
        </Link>

        <a href="https://github.com/SanjeevKumar3662" target="_blank">
          <button className="btn github-btn">
           
              <img className="git-logo" src="./GitHub-logo.png" alt="" />
            
            <span>SanjeevKumar3662</span>
          </button>
        </a>
      </div>

      <div className="mid-header">
        <ul className="media-list-menu ">
          <button className="btn">Movies</button>
          <div className="is-menu-active">
            <div className="media-list-items">
              <Link to={"/now_playing_movies"}>
                <li>Now Playing</li>
              </Link>
              <Link to={"/popular_movies"}>
                <li>Popular</li>
              </Link>
              <Link to={"/top_rated_movies"}>
                <li>Top Rated</li>
              </Link>
              <Link to={"/upcoming_movies"}>
                <li>Upcoming</li>
              </Link>
            </div>
          </div>
        </ul>
        <ul className="media-list-menu">
          <button className="btn">TV Shows</button>
          <div className="is-menu-active">
            <div className="media-list-items">
              <Link to={"/popular_tv_shows"}>
                <li>Popular</li>
              </Link>
              <li>Airing Today</li>
              <li>On TV</li>
              <li>Top Rated</li>
            </div>
          </div>
        </ul>
      </div>

      {/* <div className="right-header">
        <a href="">link 1</a>

        <a href="">link2</a>
      </div> */}
    </header>
  );
}
