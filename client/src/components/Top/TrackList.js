import React from 'react';
import Track from './Track'

export default function TrackList(props) {
  return (
    <div className="list">
     {props.tracks.map((track, index) => {
      return <Track
        key={index+1}
        rank={index+1}
        cover={track.album.images[2].url}
        artists={track.artists}
        name={track.name}
        explicit={track.explicit}
       />
     })}
    </div>
  );
}