import "./Card.css";

const Card = ({ title, poster_path, release_date }) => {
  return (
    <div className="card">
      <img
        className="poster"
        src={`https://image.tmdb.org/t/p/original${poster_path}`}
        alt=""
      />
      <div className="title">{title}</div>
      <div className="release-date">{release_date}</div>
    </div>
  );
};

export default Card;
