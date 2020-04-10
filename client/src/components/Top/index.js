import React,{useState, useEffect} from 'react';
import * as $ from 'jquery';
import TrackList from './TrackList'
import AgeListItem from './AgeListItem'
import "./index.scss"

const ARTISTS = "artists"
const TRACKS = "tracks"
const GENRE = "genre"
const ages = [{name: "Last Month", time_range: "short_term"},{name: "Last 6 Months", time_range: "medium_term"},{name: "All Time", time_range: "long_term"}]

export default function Top(props) {
  const [selected, setSelected] = useState(TRACKS)
  const [age, setAge] = useState(ages[0].name)
  const [data, setData] = useState("")

  const getData = () => {
    $.ajax({
      url: "https://api.spotify.com/v1/me/top/tracks",
      type: "GET",
      data: { 
        limit: 50, 
        time_range: ages.find(x => x.name===age).time_range
      },
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + props.token);
      },
      success: (res) => {
        console.log(res.items)
        setData(res.items)
      }
    });
  }

  useEffect(() => {
    getData()
  }, [selected,age])
  

  return (
      <section className="top">
        <td className="age-list">
          {ages.map(x => {
            return <AgeListItem name={x.name} selected={age} setAge={setAge}/>})}
        </td>
        <div>
          {data !== "" ? <TrackList tracks={data}/>:""}
        </div>
        
      </section>
  );
}