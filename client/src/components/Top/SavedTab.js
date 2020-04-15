import React,{useState, useEffect} from 'react';
import * as $ from 'jquery';
import ListItem from './ListItem'
import AddedChart from './AddedChart'


const tabs = [{name: "Weekday", time_range: "short_term"},{name: "Depressed", time_range: "medium_term"},{name: "Danceability", time_range: "long_term"}]

const getDataForWeekday = (tracks) => {
  const dataWeekday = [{day: "Sunday", count: 0, percentage:0},{day: "Monday", count: 0, percentage:0},{day: "Tuesday", count: 0, percentage:0},{day: "Wednesday", count: 0, percentage:0},{day: "Thursday", count: 0, percentage:0},{day: "Friday", count: 0, percentage:0},{day: "Saturday", count: 0, percentage:0}]
  tracks.forEach((track) => {
    let d = new Date(track.added_at)
    dataWeekday[d.getDay()].count++
  })
  dataWeekday.forEach((day) => {
    day.percentage = (day.count/tracks.length)*100
  })
  return dataWeekday
}

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
                  console.log(response)
                  console.log(index)
                  savedTracks[index].track = {...savedTracks[index].track, ...feature}
                }
              })
            }
          });
        }
        const dataSet = {savedTracks: savedTracks,weekday: getDataForWeekday(savedTracks)}
        console.log(savedTracks)
        setData(dataSet)
      }
    });
  }
  

  useEffect(() => {
    getData()
  }, [])
  

  return (
      <section className="top">
        <div className="age-list">
          {tabs.map((x,index) => {
            return <ListItem key={index} name={x.name} selected={selected} setAge={setSelected}/>})}
        </div>
        <div>
          {data !== "" ? <AddedChart data={data.weekday}/>:""}
        </div>
      </section>
  );
}