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
        label: props.label,
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
    { props.highest !== null && <div className="extremes">
      <div>
        <h1>Song with the highest {props.type}</h1>
        <div className="extremes__highest">
          <Track 
          key={0}
          cover={highest.album.images[1].url}
          artists={highest.artists}
          name={highest.name}
          />
        </div>
      </div>
      <div>
        <h1>Song with the lowest {props.type}</h1>
        <div className="extremes__lowest">
          <Track 
          key={2}
          cover={lowest.album.images[1].url}
          artists={lowest.artists}
          name={lowest.name}
          />
        </div>
      </div>
    </div>}
    </div>
  );
}