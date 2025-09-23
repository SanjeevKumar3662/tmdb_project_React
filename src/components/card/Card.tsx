import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

type CardProps = {
  id: number;
  linkTo: string;
  cssClass?: string;
  title?: string;
  name?: string;
  character?: string;
  poster_path?: string;
  profile_path?: string;
  logo_path?: string;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  popularity?: number;
};

const Card: React.FC<CardProps> = ({
  id,
  linkTo,
  cssClass,
  title,
  name,
  character,
  poster_path,
  profile_path,
  logo_path,
  release_date,
  first_air_date,
  vote_average,
  popularity,
}) => {
  const voteAvg = vote_average;

  return (
    <div className={cssClass}>
      <Link to={`/${linkTo}/${id}`}>
        <div className="poster-wrapper">
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
              alt={`poster for ${name || title}`}
              title={name || title}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <img src="/noImage.png" loading="lazy" decoding="async" />
          )}
          <div className="vote-avg-card">
            {voteAvg ? voteAvg.toFixed(1) : popularity?.toFixed(1)}
          </div>
        </div>
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
