import React,{useState, useEffect} from 'react';
import * as $ from 'jquery';
import TrackList from './TrackList'
import ListItem from './ListItem'
import {Spinner} from 'react-bootstrap'

const ages = [{name: "Last Month", time_range: "short_term"},{name: "Last 6 Months", time_range: "medium_term"},{name: "All Time", time_range: "long_term"}]

export default function TracksTab(props) {
  const [age, setAge] = useState(ages[0].name)
  const [data, setData] = useState("")
  const [loading, setLoading] = useState(true)

  const getData = () => {
    setLoading(true)
    $.ajax({
      url: `https://api.spotify.com/v1/me/top/tracks`,
      type: "GET",
      data: { 
        limit: 50, 
        time_range: ages.find(x => x.name===age).time_range
      },
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + props.token);
      },
      success: (res) => {
        setData(res.items)
        setLoading(false)
      }
    });
  }

  useEffect(() => {
    getData()
  }, [age])
  

  return (
      <section className="top--tab">
        {!loading ?
          <div>
            <div className="age-list">
              {ages.map((x,index) => {
                return <ListItem key={index} name={x.name} selected={age} setAge={setAge}/>})}
            </div>
            <div>
              {data !== "" ? <TrackList tracks={data}/>:""}
            </div>
          </div>
        : <div className="loading-tab"><Spinner animation="border"  variant="light"/> Retrieving data from Spotify...</div>}
      </section>
  );
}