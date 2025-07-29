import "./Header.css";

export default function Header() {
  return (
    <div className="header-container">
      <div className="left-header">
        <span className="logo">SanjeevKumar</span>
        <a href="">Movies</a>
        <a href="">TV Shows</a>
      </div>
      <h2>Header</h2>
      <div className="right-header">
        <a href="">link 1</a>

        <a href="">link2</a>
      </div>
    </div>
  );
}
