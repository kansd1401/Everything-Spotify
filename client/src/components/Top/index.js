import React,{useState, useEffect} from 'react';
import * as $ from 'jquery';
import TrackList from './TrackList'
import Time from './Time'
import "./index.scss"

const ARTISTS = "artists"
const TRACKS = "tracks"
const GENRE = "genre"
const age = ["Last Month", "Last 6 Months", "All Time"]


export default function Top(props) {
  const [selected, setSelected] = useState(ARTISTS)
  const [data, setData] = useState("")

  const getData = () => {
    $.ajax({
      url: "https://api.spotify.com/v1/me/top/tracks",
      type: "GET",
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
  }, [selected])
  

  return (
      <section className="top">
        <ul>
          {age.map(x => {
            return <Time name={x}/>})}
        </ul>
        <div>
          {data !== "" ? <TrackList tracks={data}/>:""}
        </div>
        
      </section>
  );
}