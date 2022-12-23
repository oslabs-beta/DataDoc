import React, {useState, useEffect} from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

const { SERVER_URL } = process.env;

const DonutChart = (props) => {
  const { id } = props;
  const [donutData, setDonutData] = useState([])
  
  ChartJS.register(ArcElement, Tooltip, Legend);
  
  useEffect(() => {
    fetch(`${SERVER_URL}/chartdata/linechart/${id}`)
    .then((serverResponse) => serverResponse.json())
    .then((serverResponseJson) => {
        console.log('getting data back from res', serverResponseJson)
        setDonutData(serverResponseJson.statusPieData);
      });
  }, []);

  const data = {
    // labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    labels: donutData.map((point) => point.x),
    datasets: [
      {
        label: "Status Codes",
        // data: [12, 19, 3, 5, 2, 3],
        data: donutData.map((point) => point.y),
 
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // ! Temporary live-fetching data; ideally use sockets
  setTimeout(() => {
    fetch(`${SERVER_URL}/chartdata/linechart/${id}`)
      .then((serverResponse) => serverResponse.json())
      .then((serverResponseJson) => {
        setDonutData(serverResponseJson.statusPieData);
      });
  }, 2000);

  return (
    <div className="donut-chart">
      <Doughnut data={data} />
    </div>
  );
};

export default DonutChart;
