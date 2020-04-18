import React,{useState, useEffect} from 'react';
import * as $ from 'jquery';
import ListItem from './ListItem'
import Chart from './Chart'
import {getDataForDanceability, getDataForEnergy, getDataForValence, getDataForWeekday} from "../../helpers/dataConversion"


const tabs = [{name: "Weekday", time_range: "short_term"},{name: "Depressed", time_range: "medium_term"},{name: "Dance", time_range: "long_term"},{name: "Energy", time_range: "long_term"}]


export default function SavedTab(props) {
  const [selected, setSelected] = useState(tabs[0].name)
  const [data, setData] = useState("")

  const getData = () => {
    let savedTracks = [];
    //Call to get the first 50 tracks
    $.ajax({
      url: `https://api.spotify.com/v1/me/tracks`,
      type: "GET",
      data: { 
        limit: 50
      },
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + props.token);
      },
      success: (res) => {
        //sync calling with the next page api link provided by the intial call untill it's null which means no more tracks left.
        savedTracks = [...res.items]
        while (res.next){
          $.ajax({
            url: res.next,
            type: "GET",
            async: false,
            data: { 
              limit: 50
            },
            beforeSend: (xhr) => {
              xhr.setRequestHeader("Authorization", "Bearer " + props.token);
            },
            success: (response) => {
              savedTracks = [...savedTracks,...response.items]
              res.next = response.next
            }
          });
        }
        for(let i = 0; i < savedTracks.length+100; i=i+100){
          //Filters tracks to 100 then returns an array of their ids
          let ids = savedTracks.filter((track,index) => {
            if(i-1 < index && index < (i+100)){
              return track 
            }
          }).map((x) => x.track.id)
          $.ajax({
            url: "https://api.spotify.com/v1/audio-features",
            type: "GET",
            async: false,
            data: { 
              ids: ids.join()
            },
            beforeSend: (xhr) => {
              xhr.setRequestHeader("Authorization", "Bearer " + props.token);
            },
            success: (response) => {
              response.audio_features.forEach((feature) => {
                if (feature){
                  const index = savedTracks.findIndex((x) => x.track.id === feature.id)
                  savedTracks[index].track = {...savedTracks[index].track, ...feature}
                }
              })
            }
          });
        }
        console.log(savedTracks)
        const dataSet = {savedTracks: savedTracks,weekday: getDataForWeekday(savedTracks), valence: getDataForValence(savedTracks), danceability: getDataForDanceability(savedTracks), energy: getDataForEnergy(savedTracks)}
        setData(dataSet)
      }
    });
  }
  

  useEffect(() => {
    if(!data){
      getData()
    }
  }, [])
  

  return (
      <section className="top">
        <div className="age-list">
          {tabs.map((x,index) => {
            return <ListItem key={index} name={x.name} selected={selected} setAge={setSelected}/>})}
        </div>
        <div>
          {data !== "" && selected === "Weekday"? <Chart data={data.weekday} chartType="bar"/>:""}
          {data !== "" && selected === "Depressed"? <Chart data={data.valence} chartType="doughnut"/>:""}
          {data !== "" && selected === "Dance"? <Chart data={data.danceability} chartType="doughnut"/>:""}
          {data !== "" && selected === "Energy"?
          <Chart data={data.energy} chartType="doughnut"/>:""}
        </div>
      </section>
  );
}