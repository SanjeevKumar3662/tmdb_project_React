import noImage from "/src/assets/noImage.png";
import "./MovieDetails.css";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovieDetails] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(
          `https://first-backend-eight.vercel.app/movie_details/${id}`
        );
        let data = await response.json();

        setMovieDetails(data);
      } catch (e) {
        console.log("error while fetching movie details", e);
      }
    };
    fetchDetails();
  }, [id]);

  console.log(movie);

  return (
    <>
      <div
        className="details-container"
        style={{
          //can't use both shorthand and normal properties, this might cause a bug
          backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.50), rgba(0, 0, 0, 0.50)), url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          color: "white",
        }}
      >
        <section className="poster-details">
          <img
            className="poster"
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
                : noImage
            }
            srcSet={movie.poster_path?`https://image.tmdb.org/t/p/w342${movie.poster_path} 1x,
            https://image.tmdb.org/t/p/w500${movie.poster_path} 2x`:noImage}
            alt="poster"
          />
        </section>
        <section className="more-info">
          <h1>{movie.title ? movie.title : "movie Name"}</h1>
          {movie.original_title && (
            <div>Original Title : {movie.original_title}</div>
          )}
          {movie.tagline && <div>Tagline : {movie.tagline}</div>}
          <div className="title">
            Discription :<span> {movie.overview}</span>
          </div>
          <div className="release-date">
            Release Date : {movie.release_date}
          </div>
          <div>
            Genres :{" "}
            {movie.genres &&
              movie.genres.map((ele) => (
                <span key={ele.id}>{ele.name} , </span>
              ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default MovieDetails;
