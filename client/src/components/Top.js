import React,{useState, useEffect} from 'react';
import * as $ from 'jquery';

const ARTISTS = "artists"
const TRACKS = "tracks"
const GENRE = "genre"


export default function BarberList(props) {
  const [selected, setSelected] = useState(ARTISTS)
  const [data, setData] = useState("")

  const getData = () => {
    $.ajax({
      url: "https://api.spotify.com/v1/me/top/artists",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + props.token);
      },
      success: (data) => {
        console.log(data)
      }
    });
  }

  useEffect(() => {
    getData()
  }, [selected])
  

  return (
      <section className="top">
        
      </section>
  );
}