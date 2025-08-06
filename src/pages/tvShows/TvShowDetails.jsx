import "./TvShowDetails.css";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

//same code as movie details page
//may be i should just make a combined details page for
//movie and tv show

const TvShowDetails = () => {
  const { id } = useParams();
  const [tv, setTvDetails] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(
          `https://first-backend-eight.vercel.app/tv_details/${id}`
        );
        let data = await response.json();

        setTvDetails(data);
      } catch (e) {
        console.log("error while fetching tv details", e);
      }
    };
    fetchDetails();
  }, [id]);

  console.log(tv);

  return (
    <>
      <div
        className="details-container"
        style={{
          //can't use both shorthand and normal properties, this might cause a bug
          backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60)), url(https://image.tmdb.org/t/p/w1280${tv.backdrop_path})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          color: "white",
        }}
      >
        <section className="poster-details">
          {tv.poster_path ? (
            <img
              className="poster"
              src={`https://image.tmdb.org/t/p/w342${tv.poster_path}`}
              srcSet={`https://image.tmdb.org/t/p/w342${tv.poster_path} 1x,
            https://image.tmdb.org/t/p/w500${tv.poster_path} 2x`}
              alt=""
              loading="eager"
              decoding="async"
            />
          ) : (
            <img src="/noImage.png" loading="lazy" decoding="async" />
          )}
        </section>
        <section className="more-info">
          <h1>{tv.name ? tv.name : "tv Name"}</h1>
          {tv.original_name && <div>Original Name : {tv.original_name}</div>}
          {tv.tagline && <div>Tagline : {tv.tagline}</div>}
          <div className="title">
            Discription :<span> {tv.overview}</span>
          </div>
          <div>
            Genres :{" "}
            {tv.genres &&
              tv.genres.map((ele) => <span key={ele.id}>{ele.name} , </span>)}
          </div>
          <div className="release-date">
            Frist Release Date : {tv.first_air_date}
          </div>
        </section>
      </div>
    </>
  );
};
export default TvShowDetails;
