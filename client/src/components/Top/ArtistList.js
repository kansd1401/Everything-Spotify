import React from 'react';
import Artist from './Artist'

export default function ArtistList(props) {
  return (
    <div className="list">
     {props.artists.map((artist, index) => {
      return <Artist
        key={index+1}
        rank={index+1}
        cover={artist.images[1].url}
        name={artist.name}
        popularity={artist.popularity}
       />
     })}
    </div>
  );
}