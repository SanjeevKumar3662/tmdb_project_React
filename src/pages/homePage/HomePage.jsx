import "./homePage.css";
import SlidingCards from "../../components/slidingCards/SlidingCards";

const homePage = () => {
  return (
    <main>
      <section className="hero">
        <div className="heroText">
          <span>Welcome.</span>
          <span>This is a Movie Database Website by SanjeevKumar3662</span>
        </div>
        <input type="text" placeholder="Search for a movie or a person" />
      </section>

      <div className="flex-sildes">
        <section className="slide-container">
        <h2>Popular TV Shows</h2>
          <SlidingCards media_type={"tv"} list_type={"popular"} ></SlidingCards>
        </section>
      </div>
      <div className="flex-sildes">
        <section className="slide-container">
        <h2>Popular Movies</h2>
          <SlidingCards media_type={"movie"} list_type={"popular"} ></SlidingCards>
        </section>
      </div>
      
    </main>
  );
};

export default homePage;
