import "./homePage.css";
import PopularMovies from "../movies/PopularMovies";

const homePage = () => {
  return (
    <main>
      <section className="hero">
        <div className="heroText">
        <span>Welcome.</span>
        <span>This is a Movie Database Website by SanjeevKumar3662</span>
        </div>
        <input type="text" placeholder="Search for a movie or a person"/>
      </section>
      <section>
        <PopularMovies></PopularMovies>
      </section>
    </main>
  );
};

export default homePage;
