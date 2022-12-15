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

  useEffect(() => {
    fetch(`${SERVER_URL}/histogram`)
      .then((serverResponse) => serverResponse.json())
      .then((serverResponseJson) => {
        const newLabels = new Array(Object.keys(serverResponseJson).length);
        const newData = new Array(Object.keys(serverResponseJson).length);
        Object.entries(serverResponseJson)
          .sort((a, b) => {
            return Number(a[0]) - Number(b[0]);
          })
          .forEach((e, i) => {
            newLabels[i] = e[0];
            newData[i] = e[1];
            return;
          });
          console.log(newData)
        setHistLabels(Object.keys(newLabels));
        setHistData(Object.values(newData));
      });
  }, []);

  const data = {
    labels: histLabels,
    datasets: [
      {
        label: "Frequency",
        data: histData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(255, 99, 132, 0.5)",
          "rgba(255, 99, 132, 0.5)",
          "rgba(255, 99, 132, 0.5)",
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
  
  return <Bar data={data} options={options} />;
};

export default Histogram;
