import React,{useState, useEffect} from 'react';
import * as $ from 'jquery';

const ages = [{name: "Last Month", time_range: "short_term"},{name: "Last 6 Months", time_range: "medium_term"},{name: "All Time", time_range: "long_term"}]

export default function ArtistsTab(props) {
  const [age, setAge] = useState(ages[0].name)
  const [data, setData] = useState("")

  const getData = () => {
    $.ajax({
      url: `https://api.spotify.com/v1/me/top/artists`,
      type: "GET",
      data: { 
        limit: 20, 
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
  }, [age])
  

  return (
      <section className="top">
        <div>
        </div>
      </section>
  );
}