import "./mediaDetails.css";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import MediaCredits from "../../components/mediaCredits/MediaCredits";
import SlidingVideos from "../../components/slidingVideos/SlidingVideos";

const MovieDetails = ({ media_type }) => {
  const { id } = useParams();
  const [movie, setMovieDetails] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(
          `https://first-backend-eight.vercel.app/media_details/${media_type}/${id}`
        );
        let data = await response.json();

        setMovieDetails(data);
      } catch (e) {
        console.log("error while fetching movie details", e);
      }
    };
    fetchDetails();
  }, [media_type, id]);

  // console.log("example:", videos.results[0]);

  return (
    <>
      <div className="details-container">
        <img
          className="details-bg"
          src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />

        <section className="poster-details">
          {movie.poster_path ? (
            <img
              className="poster"
              src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
              srcSet={`https://image.tmdb.org/t/p/w342${movie.poster_path} 1x,
            https://image.tmdb.org/t/p/w500${movie.poster_path} 2x`}
              alt="poster"
              loading="eager"
              decoding="async"
            />
          ) : (
            <img src="/noImage.png" loading="lazy" decoding="async" />
          )}
        </section>
        <section className="more-info">
          <h1>{movie.title ? movie.title : movie.name}</h1>
          {(movie.original_title || movie.original_name) && (
            <div>
              Original Title : {movie.original_title || movie.original_name}
            </div>
          )}
          {movie.tagline && <div>Tagline : {movie.tagline}</div>}
          <div className="title">
            Discription :<span> {movie.overview}</span>
          </div>
          {movie.release_date ? (
            <div className="release-date">
              Release Date : {movie.release_date}
            </div>
          ) : (
            <div className="release-date"> {movie.first_air_date}</div>
          )}
          <div>
            Genres :{" "}
            {movie.genres &&
              movie.genres.map((ele) => (
                <span key={ele.id}>{ele.name} , </span>
              ))}
          </div>
        </section>
      </div>
      <div className="video-container">
        <SlidingVideos
          media_type={media_type}
          content_type={"videos"}
          id={id}
        />
      </div>
      <div className="backdrops-container">
        <SlidingVideos
          media_type={media_type}
          content_type={"images"}
          id={id}
        />
      </div>
      <section className="credits-container">
        <MediaCredits media_type={media_type} id={id} />
      </section>
      <div className="rec-slider">
        <p className="section-heading">Recommendations</p>
        <SlidingVideos
          media_type={media_type}
          content_type={"recommendations"}
          id={id}
        />
      </div>
    </>
  );
};

export default MovieDetails;
