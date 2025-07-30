import "./Header.css";

export default function Header() {
  return (
    <div className="header-container">
      <div className="git-logo">
        <button className="github-btn">
        <a href="https://github.com/SanjeevKumar3662" target="_blank">
        </a>
          <div className="git-logo"><img src="./GitHub-logo.png" alt="" /></div>SanjeevKumar3662
        </button>
      </div>

      <div className="left-header">
        <a href="">Movies</a>
        <a href="">TV Shows</a>
      </div>
      {/* <h2>Header</h2> */}
      <div className="right-header">
        <a href="">link 1</a>

        <a href="">link2</a>
      </div>
    </div>
  );
}
