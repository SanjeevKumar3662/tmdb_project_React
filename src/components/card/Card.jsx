import noImage from "/src/assets/noImage.png"
import "./Card.css";
import { Link } from "react-router-dom";

const Card = ({ title, name, poster_path, release_date, first_air_date, id,page}) => {
  
  return (
    <div className="card">
      {/* only movies have release date, so is this is true that means it movie else a tv show */}
      <Link target="blank" to={`/${release_date?"movie_details":"tv_shows_details"}/${page}/${id}`}>
      {/* remember _blank will open a new window every time */}
        <img
          className="poster"
          src={poster_path?`https://image.tmdb.org/t/p/original${poster_path}`:noImage}
          alt=""
        />
      </Link>
      <div className="title">{title || name}</div>
      <div className="release-date">{release_date || first_air_date}</div>
    </div>
  );
};

export default Card;
