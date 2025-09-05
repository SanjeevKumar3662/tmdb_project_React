//all the styles for this page is in this,because of react.lazy if page is refreshed,
//  this page losses all required styles
import "../media/mediaDetails.css"; //styles for main info section i.e :details-container
import "../../components/slidingCards/slidingCards.css"; // this is need for credit slider styles, on refresh this was not imported

// import SlidingCards from "../../components/slidingCards/SlidingCards";
import { useQueries } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";

import { PersonCreditSlider } from "./PersonCreditSlider";

const PersonPage = () => {
  const { id } = useParams();

  // const [movieCredits, setMovieCredits] = useState(null);
  // const [tvCredits, setTvCredits] = useState(null);

  const [person, movieCredits, tvCredits] = useQueries({
    queries: [
      {
        queryKey: ["person", id],
        queryFn: fetchDetails,
      },
      {
        queryKey: ["movieCredits", id],
        queryFn: fetchMovieCredits,
      },
      {
        queryKey: ["tvCredits", id],
        queryFn: fetchTvCredits,
      },
    ],
  });

  person && console.log(person.data);
  person && window.scrollTo(0, 0); //scrolls to top

  if (person.isPending || movieCredits.isPending || tvCredits.isPending) {
    return (
      <div
        style={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <>
      <div className="person-page">
        <div className="details-container">
          {/* <h1>this is a page for {person ? person.profile_path : "......."}</h1> */}
          {/* <h1>{id}</h1> */}
          <img
            className="details-bg"
            // src={`https://image.tmdb.org/t/p/w1280${person.backdrop_path}`}
            loading="eager"
            fetchPriority="high"
            alt="background poster"
            // decoding="async"
          />

          <section className="poster-details">
            {person ? (
              <img
                className="poster"
                src={`https://image.tmdb.org/t/p/original${person.data.profile_path}`}
                // srcSet={`https://image.tmdb.org/t/p/w342${person.profile_path} 1x,
                // https://image.tmdb.org/t/p/w500${person.profile_path} 2x`}
                alt="poster for person"
                loading="eager"
                decoding="async"
              />
            ) : (
              <img src="/noImage.png" loading="lazy" decoding="async" />
            )}
          </section>
          <section className="more-info">
            <span className="media-page-heading">
              {person && person.data.name}
            </span>
            <span className="">
              Know for : {person.data && person.data.known_for_department}
            </span>
            <div className="also-know-as">
              Also Know As :
              {person.data.also_known_as &&
                person.data.also_known_as.map((ele, index) => (
                  <span key={index}> {ele}, </span>
                ))}
            </div>
            <span className="">{person.data && person.data.biography}</span>
            <span className="">
              Birth Day : {person.data && person.data.birthday}
            </span>
            {person.data && person.data.deathday && (
              <span className="">Date Of Death : {person.data.deathday}</span>
            )}
            <span className="">
              Gender :{" "}
              {person.data && person.data.gender === 1 ? "Female" : "Male"}
            </span>
            <span className="">
              Place of Birth : {person.data && person.data.place_of_birth}
            </span>
            <span>Popularity : {person.data.popularity}</span>
          </section>
        </div>

        <div className="credits-slider">
          <p className="section-heading">movie Credits</p>

          <PersonCreditSlider
            personCredits={movieCredits.data}
            link={"movie_details"}
          />

          <p className="section-heading">Tv Credits</p>

          <PersonCreditSlider
            personCredits={tvCredits.data}
            link={"tv_details"}
          />
        </div>
      </div>
    </>
  );

  async function fetchDetails() {
    const response = await fetch(
      `https://first-backend-eight.vercel.app/media_details/person/${id}`
    );
    return await response.json();
  }
  async function fetchMovieCredits() {
    try {
      const response = await fetch(
        `https://first-backend-eight.vercel.app/media_content/${"person"}/${id}/${"movie_credits"}`
      );
      const data = await response.json();
      // console.log(data.cast);

      // setMovieCredits(data);
      return data;
    } catch (e) {
      console.log("error while fetching movie credits", e);
    }
  }

  async function fetchTvCredits() {
    try {
      const response = await fetch(
        `https://first-backend-eight.vercel.app/media_content/${"person"}/${id}/${"tv_credits"}`
      );
      const data = await response.json();
      // console.log("tvCredits",data.cast[0]);

      // setTvCredits(data);
      return data;
    } catch (e) {
      console.log("error while fetching movie credits", e);
    }
  }
};
export default PersonPage;
