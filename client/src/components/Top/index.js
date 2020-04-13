import React,{useState} from 'react';
import TracksTab from './TracksTab'
import ListItem from './ListItem'
import ArtistsTab from './ArtistsTab'
import SavedTab from './SavedTab'
import "./index.scss"

const tabs = ["Top Tracks","Top Artists","Genre Statistics"]

export default function Top(props) {
  const [selected, setSelected] = useState(tabs[0])

  return (
      <section className="top">
        <div className="age-list">
          {tabs.map((x,index) => {
            return <ListItem key={index} name={x} selected={selected} setAge={setSelected}/>})}
        </div>
        {selected==="Top Tracks" && <TracksTab token={props.token}/>}
        {selected==="Top Artists" && <ArtistsTab token={props.token}/>}
        {selected==="Genre Statistics" && <SavedTab token={props.token}/>}
      </section>
  );
}