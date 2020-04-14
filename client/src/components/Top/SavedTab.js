import React,{useState, useEffect} from 'react';
import * as $ from 'jquery';
import ListItem from './ListItem'
import AddedChart from './AddedChart'


const tabs = [{name: "Weekday", time_range: "short_term"},{name: "Depressed", time_range: "medium_term"},{name: "Danceability", time_range: "long_term"}]

const getData = (token) => {
  let savedTracks = [];
  $.ajax({
    url: `https://api.spotify.com/v1/me/tracks`,
    type: "GET",
    data: { 
      limit: 50
    },
    beforeSend: (xhr) => {
      xhr.setRequestHeader("Authorization", "Bearer " + token);
    },
    success: (res) => {
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
            xhr.setRequestHeader("Authorization", "Bearer " + token);
          },
          success: (response) => {
            savedTracks = [...savedTracks,...response.items]
            res.next = response.next
          }
        });
      }
      console.log(savedTracks)
      const dataSet = {savedTracks: savedTracks,weekday: getDataForWeekday(savedTracks)}
      console.log(dataSet)
      return dataSet
    }
  });
}

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

  

  useEffect(() => {
    setData(getData(props.token))
  }, [age])
  

  return (
      <section className="top">
        <div className="age-list">
          {tabs.map((x,index) => {
            return <ListItem key={index} name={x.name} selected={selected} setAge={setSelected}/>})}
        </div>
        <div>
          {data !== "" && selected === "Weekday" && <AddedChart data={data.weekday}/>}
        </div>
      </section>
  );
}