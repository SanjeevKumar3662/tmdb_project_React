import "./Card.css";
import { Link } from "react-router-dom";

const Card = ({
  title,
  name,
  character,
  poster_path,
  profile_path,
  logo_path,
  release_date,
  first_air_date,
  id,
  cssClass,
  linkTo,
}) => {
  // console.log(profile_path);
  return (
    <div className={cssClass}>
      {/* only movies have release date, so if this is true that means it is a movie else a tv show */}
      <Link target="" to={`/${linkTo}/${id}`}>
        {/* -remember _blank will open a new window every time 
            -using w500 for poster lower resolution for low latency */}
        {poster_path || profile_path || logo_path ? (
          <img
            className="poster"
            src={`https://image.tmdb.org/t/p/w185${
              poster_path || profile_path || logo_path
            }`}
            srcSet={`https://image.tmdb.org/t/p/w185${
              poster_path || profile_path || logo_path
            } 1x,
          https://image.tmdb.org/t/p/w342${
            poster_path || profile_path || logo_path
          } 2x`}
            alt={`poster for ${name}`}
            title={name || title}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <img src="/noImage.png" loading="lazy" decoding="async" />
        )}
      </Link>
      <div className="card-info">
        <div className="title">{title || name}</div>
        {character && <div className="character">{character}</div>}
        <div className="release-date">{release_date || first_air_date}</div>
      </div>
    </div>
  );
};

export default Card;
