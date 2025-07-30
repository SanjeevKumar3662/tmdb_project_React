import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <div className="header-container">
      <div className="git-logo">
        <button className="btn github-btn">
          <a href="https://github.com/SanjeevKumar3662" target="_blank">
            <div className="git-logo">
              <img src="./GitHub-logo.png" alt="" />
            </div>
            <span >SanjeevKumar3662</span>
          </a>
        </button>
      </div>

      <div className="left-header">
        {/* <a href="">Movies</a> */}
        <Link to={"/"}>
          <button className="btn">Movies</button>
        </Link>
        <Link to={"/popular_tv_shows"}>
          <button className="btn">TV Shows</button>
        </Link>
        {/* <a href="">TV Shows</a> */}
      </div>
      {/* <h2>Header</h2> */}
      <div className="right-header">
        <a href="">link 1</a>

        <a href="">link2</a>
      </div>
    </div>
  );
}
