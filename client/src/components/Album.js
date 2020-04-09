import React from "react";

import classnames from "classnames";

export default function Artist(props) {
  const artistInfoClass = classnames("artist__info", {
    "artist__info--explicit": props.collectionExplicitness === "explicit"
  });

  return (
    <article className="artist">
      <img className="artist__thumbnail" src={props.artworkUrl100} alt="Artist" />
      <div className={artistInfoClass}>
        <div className="artist__name">{props.collectionName}</div>
        <div className="artist__artist">{props.artistName}</div>
      </div>
    </article>
  );
}