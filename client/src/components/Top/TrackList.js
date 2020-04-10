import React from 'react';
import Track from './Track'

export default function TrackList(props) {
  return (
    <div className="track">
     {props.tracks.map(track => {
      return <Track
        cover={track.album.images[0].url}
        artists={track.artists}
        album={track.album.name}
        name={track.name}
       />
     })}
    </div>
  );
}