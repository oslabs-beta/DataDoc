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

const LineChart = (props) => {

  const { id, chartData } = props;

  ChartJS.register(
    TimeScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const data = {
    datasets: [
      {
        label: "My First Dataset",
        data: chartData,
        fill: false,
        borderColor: ["rgb(75, 192, 192)"],
        tension: 0.2,
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
    animation: false,
  };

return (
    <div className="chartWrapper">
      <div className="chartAreaWrapper">
        <div className="line-chart">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default LineChart;
