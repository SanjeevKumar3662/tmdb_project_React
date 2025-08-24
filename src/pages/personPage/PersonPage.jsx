import "./personPage.css";
// import "../media/mediaDetails.css"
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const PersonPage = () => {
  const { id } = useParams();
  // https://first-backend-eight.vercel.app/media_credits/person/974169/

  const [person, setPerson] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(
          `https://first-backend-eight.vercel.app/media_details/person/${id}`
        );
        let data = await response.json();

        setPerson(data);
        console.log(data);
      } catch (e) {
        console.log("error while fetching movie details", e);
      }
    };
    fetchDetails();
  }, [id]);

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
            decoding="async"
          />

          <section className="poster-details">
            {person ? (
              <img
                className="poster"
                src={`https://image.tmdb.org/t/p/original${person.profile_path}`}
                // srcSet={`https://image.tmdb.org/t/p/w342${person.profile_path} 1x,
                // https://image.tmdb.org/t/p/w500${person.profile_path} 2x`}
                alt="poster"
                loading="eager"
                decoding="async"
              />
            ) : (
              <img src="/noImage.png" loading="lazy" decoding="async" />
            )}
          </section>
          <section className="more-info">
            <span className="media-page-heading">{person && person.name}</span>
            <span className="">
              Know for : {person && person.known_for_department}
            </span>
            <span className="">Birth Day : {person && person.birthday}</span>
            {person && person.deathday && (
              <span className="">Date Of Death : {person.deathday}</span>
            )}
            <span className="">Gender : {person && person.gender}</span>
            <span className="">
              Place of Birth : {person && person.place_of_birth}
            </span>
            <span className="">{person && person.biography}</span>
          </section>
        </div>
      </div>
    </>
  );
};

export default PersonPage;
