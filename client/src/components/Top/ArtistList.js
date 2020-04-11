import React from 'react';
import Artist from './Artist'

export default function ArtistList(props) {
  return (
    <div className="list">
     {props.tracks.map((track, index) => {
      return <Artist
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