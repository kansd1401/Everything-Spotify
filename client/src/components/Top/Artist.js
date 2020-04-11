import React from "react";
import classnames from "classnames";

export default function Artist(props) {
  const artistInfoClass = classnames("artist__info", {
    "artist__info--explicit": props.collectionExplicitness === "explicit"
  });

  return (
    <article className="artist">
      <div className="artist__rank">
        {props.rank}
      </div>
      <img className="artist__thumbnail" src={props.cover} alt="Artist" />
      <div className={artistInfoClass}>
        <div className="artist__name">{props.name}</div>
        <div className="artist__artist">{props.popularity}</div>
      </div>
    </article>
  );
}