import "./mediaDetails.css";
// import { useEffect } from "react";
// import { useState } from "react";
import { useParams } from "react-router-dom";
import MediaCredits from "../../components/mediaCredits/MediaCredits";
import MediaContentSlider from "../../components/slidingVideos/MediaContentSlider";
import { useQuery } from "@tanstack/react-query";

const MediaDetails = ({ media_type }) => {
  const { id } = useParams();

  const {
    data: media,
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
    <>
      <div className="details-container">
        {media.backdrop_path && (
          <img
            className="details-bg"
            src={`https://image.tmdb.org/t/p/w1280${media.backdrop_path}`}
            alt="backdrop image"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        )}
        <section className="poster-details">
          {media.poster_path ? (
            <img
              className="poster"
              src={`https://image.tmdb.org/t/p/w342${media.poster_path}`}
              srcSet={`https://image.tmdb.org/t/p/w342${media.poster_path} 1x,
            https://image.tmdb.org/t/p/w500${media.poster_path} 2x`}
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
            {media.title ? media.title : media.name}
          </span>
          {(media.original_title || media.original_name) && (
            <div>
              Original Title : {media.original_title || media.original_name}
            </div>
          )}
          {media.tagline && <div>Tagline : {media.tagline}</div>}
          <div className="title">
            Discription :<span> {media.overview}</span>
          </div>
          {media.release_date ? (
            <div className="release-date">
              Release Date : {media.release_date}
            </div>
          ) : (
            <div className="release-date"> {media.first_air_date}</div>
          )}
          <div>
            Genres :{" "}
            {media.genres &&
              media.genres.map((ele) => (
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
  );
};

export default MediaDetails;
