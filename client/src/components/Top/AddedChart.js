import React from 'react';
import {Bar} from 'react-chartjs-2';

export default function TracksTab(props) {
  return (
    <div>
      <Bar data={{
        labels: props.data.map((x) => x.day),
        datasets: [{
        label: "My First dataset",
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: props.data.map((x) => x.percentage),
        }]
    }}/>
    </div>
  );
}