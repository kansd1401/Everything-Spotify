import React from 'react';
import {Bar, Doughnut} from 'react-chartjs-2';
import Track from './Track'

export default function Chart(props) {
  const highest = props.data[0].highest
  const lowest = props.data[0].lowest
  return (
    <div className="chart">
      {props.chartType === "bar" && <Bar data={{
        labels: props.data.map((x) => x.day),
        datasets: [{
        label: "Percentage of Saved Tracks",
        backgroundColor: [
            'rgba(255, 99, 132)',
            'rgba(54, 162, 235)',
            'rgba(255, 206, 86)',
            'rgba(75, 192, 192)',
            'rgba(153, 102, 255)',
            'rgba(255, 159, 64)'
        ],
        borderColor: [
          'rgba(255, 99, 132)',
          'rgba(54, 162, 235)',
          'rgba(255, 206, 86)',
          'rgba(75, 192, 192)',
          'rgba(153, 102, 255)',
          'rgba(255, 159, 64)'
        ],
        data: props.data.map(x => x.percentage),
        }]
    }}/>}
    {props.chartType === "doughnut" && <Doughnut data={{
        labels: props.data.map((x) => x.day),
        datasets: [{
        label: "Percentage of Saved Tracks",
        backgroundColor: [
            'rgba(255, 99, 132)',
            'rgba(54, 162, 235)',
            'rgba(255, 206, 86)',
            'rgba(75, 192, 192)',
            'rgba(153, 102, 255)',
            'rgba(255, 159, 64)'
        ],
        borderColor: [
          'rgba(255, 99, 132)',
          'rgba(54, 162, 235)',
          'rgba(255, 206, 86)',
          'rgba(75, 192, 192)',
          'rgba(153, 102, 255)',
          'rgba(255, 159, 64)'
        ],
        data: props.data.map((x) => x.percentage),
        }]
    }}/>}
      {highest ? <Track 
       key={0}
       rank={1}
       cover={highest.album.images[2].url}
       artists={highest.artists}
       name={highest.name}
       explicit={highest.explicit}
      />: ""}
      {lowest ? <Track 
       key={2}
       rank={2}
       cover={lowest.album.images[2].url}
       artists={lowest.artists}
       name={lowest.name}
       explicit={lowest.explicit}
      />: ""}
      
    </div>
  );
}