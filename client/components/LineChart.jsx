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
  const [lineLabels, setLineLabels] = useState([]);
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
        const { labels, data } = serverResponseJson.respTimeLineData;
        // console.log(labels.map(e => new Date(e)));
        setLineLabels(labels.map(e => new Date(e)));
        setLineData(data);
      });
  }, []);

  const values = [
    {
      x: new Date("2020-01-01"),
      y: 100.2
    },
    {
      x: new Date("2020-01-02"),
      y: 102.2
    },
    {
      x: new Date("2020-01-03"),
      y: 105.3
    },
    {
      x: new Date("2020-01-11"),
      y: 104.4
    }
  ];

  const data = {
    labels: lineLabels.map((e) => e.toUTCString()),
    datasets: [
      {
        label: "My First Dataset",
        // data: values,
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
    response: true,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "second"
        }
      }
    }
  }

  return (
    <div className="line-chart">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
