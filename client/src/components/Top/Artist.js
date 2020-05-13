import React from "react";

export default function Artist(props) {

  return (
    <article className="artist">
      <img className="artist__thumbnail" src={props.cover} alt="Artist" />
      <div className="artist__info">
        <div className="artist__rank">{props.rank}</div>
        <div className="artist__side">
          <div className="artist__name">{props.name}</div>
          <div className="artist__popularity">Popularity {props.popularity}</div>
        </div>
      </div>
    </article>
  );
}