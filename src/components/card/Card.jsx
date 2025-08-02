import "./Card.css";
import { Link } from "react-router-dom";

const Card = ({ title, name, poster_path, release_date, first_air_date, id}) => {
  
  return (
    <div className="card">
      {/* only movies have release date, so is this is true that means it movie else a tv show */}
      <Link to={`/${release_date?"movie_details":"tv_shows_details"}/${id}`}>
        <img
          className="poster"
          src={`https://image.tmdb.org/t/p/original${poster_path}`}
          alt=""
        />
      </Link>
      <div className="title">{title || name}</div>
      <div className="release-date">{release_date || first_air_date}</div>
    </div>
  );
};

export default Card;
