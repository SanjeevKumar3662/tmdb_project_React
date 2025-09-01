import "./mediaDetails.css";
// import { useEffect } from "react";
// import { useState } from "react";
import { useParams } from "react-router-dom";
import MediaCredits from "../../components/mediaCredits/MediaCredits";
import MediaContentSlider from "../../components/slidingVideos/MediaContentSlider";
import { useQuery } from "@tanstack/react-query";

const MovieDetails = ({ media_type }) => {
  const { id } = useParams();

  const {
    data: movie,
    isPending,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: [id],
    queryFn: fetchDetails,
  });

  async function fetchDetails() {
    const response = await fetch(
      `https://first-backend-eight.vercel.app/media_details/${media_type}/${id}`
    );
    return await response.json();
  }

  if (isPending) {
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

  if (isError) {
    return <div>Error in media details page</div>;
  }

  isSuccess && window.scrollTo(0, 0); //scrolls to top

  return (
    (
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
                // decoding="async"
              />
            ) : (
              <img src="/noImage.png" loading="lazy" decoding="async" />
            )}
          </section>
          <section className="more-info">
            <span className="media-page-heading">
              {movie.title ? movie.title : movie.name}
            </span>
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
          <MediaContentSlider
            media_type={media_type}
            content_type={"videos"}
            id={id}
          />
        </div>
        <div className="backdrops-container">
          <MediaContentSlider
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
          <MediaContentSlider
            media_type={media_type}
            content_type={"recommendations"}
            id={id}
          />
        </div>
      </>
    )
  );
};

export default MovieDetails;
