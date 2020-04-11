import React,{useState, useEffect} from 'react';
import * as $ from 'jquery';
import ArtistList from './ArtistList'
import ListItem from './ListItem'

const ages = [{name: "Last Month", time_range: "short_term"},{name: "Last 6 Months", time_range: "medium_term"},{name: "All Time", time_range: "long_term"}]

export default function ArtistsTab(props) {
  const [age, setAge] = useState(ages[0].name)
  const [data, setData] = useState("")

  const getData = () => {
    $.ajax({
      url: `https://api.spotify.com/v1/me/top/artists`,
      type: "GET",
      data: { 
        limit: 10, 
        time_range: ages.find(x => x.name===age).time_range
      },
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + props.token);
      },
      success: (res) => {
        for(let i =0; i < res.items.length; i++){
          $.ajax({
            url: res.items[i].href,
            type: "GET",
            beforeSend: (xhr) => {
              xhr.setRequestHeader("Authorization", "Bearer " + props.token);
            },
            success: (response) => {
              console.log(response)
              res.items[i] = {...response}
            }
          });
        }
        setData(res.items)
      }
    });
  }

  useEffect(() => {
    getData()
  }, [age])
  

  return (
      <section className="top">
        <div className="age-list">
          {ages.map((x,index) => {
            return <ListItem key={index} name={x.name} selected={age} setAge={setAge}/>})}
        </div>
        <div>
          {data !== "" ? <ArtistList artists={data}/>:""}
        </div>
      </section>
  );
}