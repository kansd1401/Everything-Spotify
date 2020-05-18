import React from 'react';
import TracksTab from './TracksTab'
import ArtistsTab from './ArtistsTab'
import SavedTab from './SavedTab'
import "./index.scss"
  
export default function Top({selected, token}) {

  return (
      <section className="top">
        {selected==="Top Tracks" && <TracksTab token={token}/>}
        {selected==="Top Artists" && <ArtistsTab token={token}/>}
        {selected==="Statistics" && <SavedTab token={token}/>}
      </section>
  );
}