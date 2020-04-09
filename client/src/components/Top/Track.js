import React from "react";
import classnames from "classnames";

export default function Track(props) {
  const trackInfoClass = classnames("track__info", {
    "track__info--explicit": props.collectionExplicitness === "explicit"
  });

  return (
    <article className="track">
      <img className="track__thumbnail" src={props.artworkUrl100} alt="Track" />
      <div className={trackInfoClass}>
        <div className="track__name">{props.collectionName}</div>
        <div className="track__artist">{props.artistName}</div>
      </div>
    </article>
  );
}