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

const Histogram = (props) => {

  const { id, chartData } = props;

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const data = {
    labels: chartData.map((point) => point.x),
    datasets: [
      {
        label: "Frequency",
        data: chartData.map((point) => point.y),
        backgroundColor: ["rgba(255, 99, 132, 0.5)"],
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

  return (
    <div className="histogram">
      <Bar data={data} options={options} />
    </div>
  );
};

export default Histogram;
