import React from "react";
import classnames from "classnames";
import { Palette } from "color-thief-react";
import {Spinner} from 'react-bootstrap'

export default function Track(props) {
  const artists = props.artists.map((artist) => artist.name).join(", ")

  return (
    <Palette src={props.cover} crossOrigin="Anonymous" colorCount={2} format="hex">
    {({ data, loading }) => {
      if (loading) return <div className="loading-track"><Spinner animation="border"  variant="light"/></div>;
      return (
          <article className="track" style={{ background: data[1], color: data[0] }}>
            <img className="track__thumbnail" src={props.cover} alt="Track" />
            <div className="track__info">
              <div className="track__rank">
                {props.rank}
              </div>
              <div className="track__side">
                <div className="track__name">{props.name}</div>
                <div className="track__artists">{artists}</div>
              </div>
            </div>
          </article>
          );
        }}
      </Palette>
  );
}