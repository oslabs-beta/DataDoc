import React, { useState, useEffect } from "react";
import "chartjs-adapter-moment";
import {
  Chart as ChartJS,
  CategoryScale,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

const { SERVER_URL } = process.env;

const LineChart = (props) => {
  const {id} = props
  const [lineData, setLineData] = useState([]);

  ChartJS.register(
    // CategoryScale,
    TimeScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  useEffect(() => {
    fetch(`${SERVER_URL}/chartdata/linechart/${id}`)
      .then((serverResponse) => serverResponse.json())
      .then((serverResponseJson) => {
        setLineData(serverResponseJson.respTimeLineData);
      });
  }, []);

  const data = {
    datasets: [
      {
        label: "My First Dataset",
        data: lineData,
        fill: false,
        borderColor: [
          "rgb(75, 192, 192)",
        ],
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "time",
      },
    },
  }

  // ! Temporary live-fetching data; ideally use sockets
  setTimeout(() => {
    fetch(`${SERVER_URL}/chartdata/linechart/${id}`)
      .then((serverResponse) => serverResponse.json())
      .then((serverResponseJson) => {
        setLineData(serverResponseJson.respTimeLineData);
      });
  }, 2000);

  return (
    <div className="chartWrapper">
      <div className="chartAreaWrapper">
        <div className="line-chart">
          <Line 
            data={data} 
            options={options} 
          />
        </div>
      </div>
    </div>
  );
};

export default LineChart;
