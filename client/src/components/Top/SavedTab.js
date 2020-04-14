import React,{useState, useEffect} from 'react';
import * as $ from 'jquery';

const ages = [{name: "Last Month", time_range: "short_term"},{name: "Last 6 Months", time_range: "medium_term"},{name: "All Time", time_range: "long_term"}]

const getData = (token) => {
  let dataSet = [];
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
      dataSet = [...res.items]
      console.log(dataSet)
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
            console.log(response)
            dataSet = [...dataSet,...response.items]
            res.next = response.next
          }
        });
      }
      return res.items
    }
  });
}

export default function SavedTab(props) {
  const [age, setAge] = useState(ages[0].name)
  const [data, setData] = useState("")

  

  useEffect(() => {
    setData(getData(props.token))
  }, [age])
  

  return (
      <section className="top">
        <div>
        </div>
      </section>
  );
}