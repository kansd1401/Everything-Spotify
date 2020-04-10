import React,{useState} from 'react';
import TracksTab from './TracksTab'
import ListItem from './ListItem'
import "./index.scss"

const tabs = ["Top Tracks","Top Artists","Genre Statistics"]

export default function Top(props) {
  const [selected, setSelected] = useState(tabs[0].name)

  return (
      <section className="top">
        <td className="age-list">
          {tabs.map(x => {
            return <ListItem name={x} selected={selected} setAge={setSelected}/>})}
        </td>
        {selected==="Top Tracks" && <TracksTab token={props.token}/>}
      </section>
  );
}