import React, { useState, useEffect } from "react";
import { Card } from "@mui/material";
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
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

const LineChart = (props) => {
  const { chartData, chartTitle, chartLabel } = props;

  ChartJS.register(
    TimeScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );

  const data = {
    datasets: [
      {
        label: chartLabel,
        data: chartData,
        fill: true,
        backgroundColor: ["rgba(75, 192, 192, 0.50)"],
        borderColor: ["rgb(75, 192, 192)"],
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: chartTitle,
      },
      legend: {
        display: false,
        position: "bottom"
      },
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "time",
        grid: {
          display: false,
        }
      },
    },
    animation: false,
  };

  return (
    <Card>
      <div className="chartWrapper">
        <div className="chartAreaWrapper">
          <div className="line-chart">
            <Line data={data} options={options} />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LineChart;
