import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

const { SERVER_URL } = process.env;
console.log(SERVER_URL)

const Histogram = (props) => {
  const {id, chartData} = props
  const [histLabels, setHistLabels] = useState([]);
  const [histData, setHistData] = useState([]);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  // useEffect(() => {
  //   fetch(`${SERVER_URL}/histogram/${id}`)
  //     .then((serverResponse) => serverResponse.json())
  //     .then((serverResponseJson) => {
  //       const newLabels = new Array(Object.keys(serverResponseJson).length);
  //       const newData = new Array(Object.keys(serverResponseJson).length);
  //       Object.entries(serverResponseJson)
  //         .sort((a, b) => {
  //           return Number(a[0]) - Number(b[0]);
  //         })
  //         .forEach((e, i) => {
  //           newLabels[i] = e[0];
  //           newData[i] = e[1];
  //           return;
  //         });
  //       setHistLabels(newLabels);
  //       setHistData(newData);
  //     });
  // }, []);

  useEffect(()=>{
    const newLabels = new Array(Object.keys(chartData).length)
    const newData = new Array(Object.keys(chartData).length)
    Object.entries(props.chartData)
          .sort((a, b) => {
            return Number(a[0]) - Number(b[0]);
          })
          .forEach((e, i) => {
            newLabels[i] = e[0];
            newData[i] = e[1];
            return;
          });
        setHistLabels(newLabels);
        setHistData(newData);
      },[]);

  const data = {
    // labels: histLabels,
    labels: histData.map((point) => point.x),
    datasets: [
      {
        label: "Frequency",
        // data: histData,
        data: histData.map((point) => point.y),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
        ],
        barPercentage: 1.0,
        categoryPercentage: 1.0,
        borderWidth: 1.0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Response Time Distribution",
      },
    },
  };

  // ! Temporary live-fetching data; ideally use sockets
  setTimeout(() => {
    fetch(`${SERVER_URL}/chartdata/linechart/${id}`)
      .then((serverResponse) => serverResponse.json())
      .then((serverResponseJson) => {
        setHistData(serverResponseJson.respTimeHistData);
      });
  }, 2000);
  
  return (
    <div className="histogram">
      <Bar data={data} 
      options={options} />
    </div>
  );
};

export default Histogram;
