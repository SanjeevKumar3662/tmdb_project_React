//all the styles for this page is in this,because of react.lazy if page is refreshed,
//  this page losses all required styles
import "../media/mediaDetails.css"; //styles for main info section i.e :details-container
import "../../components/slidingCards/slidingCards.css"; // this is need for credit slider styles, on refresh this was not imported
import personBg from "/personBg.png";
// import SlidingCards from "../../components/slidingCards/SlidingCards";
import { useQueries } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";

import { PersonCreditSlider } from "./PersonCreditSlider";

const PersonPage: React.FC = () => {
  const { id } = useParams();

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

  // person && console.log(person.data);
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
  if (person.isError || movieCredits.isError || tvCredits.isError) {
    return (
      <div
        style={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span>Error in Person page</span>
      </div>
    );
  }

  return (
    <>
      <div className="person-page">
        <div className="details-container">
          {
            <img
              className="details-bg"
              // src={`https://image.tmdb.org/t/p/w1280/.jpg`}
              src={personBg}
              loading="eager"
              fetchPriority="high"
              alt="background poster"
              // decoding="async"
            />
          }

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
                person.data.also_known_as.map((ele:string, index:number) => (
                  <span key={index}> {ele}, </span>
                ))}
            </div>
            <span className="">{person.data && person.data.biography}</span>
            <span className="">
              Birth Day : {person.data && person.data.birthday}
            </span>
            <span className="">
              Age :{" "}
              {person.data.birthday && new Date().getFullYear() -
                Number(person.data.birthday.slice(0, 4))}
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
    try {
      const response = await fetch(
        `https://first-backend-eight.vercel.app/media_details/person/${id}`
      );
      return await response.json();
    } catch (error) {
      console.error(
        `error occured while fetching fetchDetails in Person page for ID: ${id}`,
        "\n",
        error
      );
    }
  }

  async function fetchMovieCredits() {
    try {
      const response = await fetch(
        `https://first-backend-eight.vercel.app/media_content/${"person"}/${id}/${"movie_credits"}`
      );
      const data = await response.json();

      return data;
    } catch (error) {
      console.error(
        `error occured while fetching movie credit in Person page for ID: ${id}`,
        "\n",
        error
      );
    }
  }

  async function fetchTvCredits() {
    try {
      const response = await fetch(
        `https://first-backend-eight.vercel.app/media_content/${"person"}/${id}/${"tv_credits"}`
      );
      const data = await response.json();

      return data;
    } catch (error) {
      console.error(
        `error occured while fetching tv credits in Person page for ID: ${id}`,
        "\n",
        error
      );
    }
  }
};
export default PersonPage;
