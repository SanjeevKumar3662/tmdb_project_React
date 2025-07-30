import "./Card.css";

const Card = ({ title, name, poster_path, release_date, first_air_date }) => {
  return (
    <div className="card">
      <img
        className="poster"
        src={`https://image.tmdb.org/t/p/original${poster_path}`}
        alt=""
      />
      <div className="title">{title || name}</div>
      <div className="release-date">{release_date || first_air_date}</div>
    </div>
  );
};

export default Card;
