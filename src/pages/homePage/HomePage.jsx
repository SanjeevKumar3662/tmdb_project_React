import heroImage from "/hero.webp";
import "./homePage.css";
import SlidingCards from "../../components/slidingCards/SlidingCards";
import { useNavigate } from "react-router-dom";//for triggering a route programmatically

const HomePage = () => {
  // function onSearchSubmit(){}
  const navigate = useNavigate();

  return (
    <main>
      <section className="hero">
        <img src={heroImage} alt="" loading="eager" />
        <div className="heroText">
          <span>Welcome.</span>
          <span>This is a Movie Database Website by SanjeevKumar3662</span>
        </div>
        <input
          onKeyDown={(e) => {
            e.key === "Enter" && navigate(`/search/${e.target.value}`);
          }}
          type="text"
          placeholder="Search for a movie or a person"
        />
      </section>

      <div className="flex-sildes">
        <section className="slide-container">
          <h2>Popular TV Shows</h2>
          <SlidingCards media_type={"tv"} list_type={"popular"}></SlidingCards>
        </section>
      </div>
      <div className="flex-sildes">
        <section className="slide-container">
          <h2>Popular Movies</h2>
          <SlidingCards
            media_type={"movie"}
            list_type={"popular"}
          ></SlidingCards>
        </section>
      </div>
    </main>
  );
};

export default HomePage;
