import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import dataObj from './data.js'

const Histogram = (props) => {

  const [histData, setHistData] = useState({})

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  useEffect(() => {
    fetch('http://localhost:9990/histogram')
      .then(res => res.json())
      .then(test => setHistData(test))
  }, [])
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Response Time Distribution',
      },
    },
  };
  console.log(histData)
  const data = {
    labels: Object.keys(histData).sort((a, b) => a - b ),
    datasets: [
      {
        label: 'Response Time (ms)',
        data: Object.values(histData),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(255, 99, 132, 0.5)',
          'rgba(255, 99, 132, 0.5)',
          'rgba(255, 99, 132, 0.5)',
          'rgba(255, 99, 132, 0.5)'        
        ]
      },
    ],
  };
  
  return (
    <Bar 
      data={data} 
      options={options} 
    />
  )
}

export default Histogram;