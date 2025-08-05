import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header className="header-container">
      <div className="left-header">
        <Link to={"/"}>
          <button className="btn">Home</button>
        </Link>

        <button className="btn github-btn">
          <a href="https://github.com/SanjeevKumar3662" target="_blank">
            <div className="git-logo">
              <img src="./GitHub-logo.png" alt="" />
            </div>
            <span>SanjeevKumar3662</span>
          </a>
        </button>
      </div>

      <div className="mid-header">
        {/* <a href="">Movies</a> */}
        <Link to={"/popular_moives"}>
          <button className="btn">Movies</button>
        </Link>
        <Link to={"/popular_tv_shows"}>
          <button className="btn">TV Shows</button>
        </Link>
      </div>

      <div className="right-header">
        <a href="">link 1</a>

        <a href="">link2</a>
      </div>
    </header>
  );
}
