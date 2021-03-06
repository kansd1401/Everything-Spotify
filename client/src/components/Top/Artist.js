import React from "react";

export default function Artist(props) {

  return (
    <article className="artist">
      <img className="artist__thumbnail" src={props.cover} alt="Artist" />
      <div className="artist__info">
        <div className="artist__rank">{props.rank}</div>
        <p className="artist__name">{props.name}</p>
        {/* <div className="artist__popularity">Popularity {props.popularity}</div> */}
      </div>
    </article>
  );
}