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

      <section className="slide-container">
        <h2>Popular Movies</h2>
        <SlidingCards></SlidingCards>
      </section>
      <section className="slide-container">
        <h2>Trending Movies</h2>
        <SlidingCards></SlidingCards>
      </section>
      <section className="slide-container">
        <h2>Popular Movies</h2>

        <SlidingCards></SlidingCards>
      </section>
    </main>
  );
};

export default homePage;
