import React from 'react';
import Track from './Track'

export default function TrackList(props) {
  return (
    <div className="list">
     {props.tracks.map(track => {
      return <Track
        cover={track.album.images[1].url}
        artists={track.artists}
        album={track.album.name}
        name={track.name}
        explicit={track.explicit}
       />
     })}
    </div>
  );
}