import React from "react";
import classnames from "classnames";

export default function Track(props) {
  const artists = props.artists.map((artist) => artist.name).join(", ")
  const trackInfoClass = classnames("track__info", {
    "track__info--explicit": props.explicit
  });

  return (
    <article className="track">
      <div className="track__rank">
        {props.rank}
      </div>
      <img className="track__thumbnail" src={props.cover} alt="Track" />
      <div className={trackInfoClass}>
        <div className="track__name">{props.name}</div>
        <div className="track__artists">{artists}</div>
      </div>
    </article>
  );
}