import React from "react";
import classnames from "classnames";
import { Palette } from "color-thief-react";


export default function Track(props) {
  const artists = props.artists.map((artist) => artist.name).join(", ")
  const trackInfoClass = classnames("track__info", {
    "track__info--explicit": props.explicit
  });
  const Loading = () => <div>Loading...</div>;

  return (
    <Palette src={props.cover} crossOrigin="Anonymous" colorCount={2} format="hex">
    {({ data, loading }) => {
      if (loading) return <Loading />;
      return (
          <article className="track" style={{ background: data[1], color: data[0] }}>
            <img className="track__thumbnail" src={props.cover} alt="Track" />
            <div className={trackInfoClass}>
              <div className="track__rank">
                {props.rank}
              </div>
              <div className="track__name">{props.name}</div>
              <div className="track__artists">{artists}</div>
            </div>
          </article>
          );
        }}
      </Palette>
  );
}