import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

const DonutChart = (props) => {
  const { id, chartData } = props;

  ChartJS.register(ArcElement, Tooltip, Legend);

  const backgroundOpacity = 0.75;
  const borderOpacity = 1;
  const gradientFactor = 4;
  const colorMapper = (value, gradientFactor, opacity) => {
    if (value < 200)
      return `rgba(64, ${
        192 - (Number(value) % 100) * gradientFactor
      }, 192, ${opacity})`;
    else if (value < 300)
      return `rgba(64, ${
        255 - (Number(value) % 200) * gradientFactor
      }, 64, ${opacity})`;
    else if (value < 400)
      return `rgba(${255 - (Number(value) % 300) * gradientFactor},${
        255 - (Number(value) % 300) * gradientFactor
      }, 128, ${opacity})`;
    else if (value < 500)
      return `rgba(${
        255 - (Number(value) % 400) * gradientFactor
      }, 64, 64, ${opacity})`;
    else if (value < 600)
      return `rgba(${
        128 - (Number(value) % 500) * gradientFactor
      }, 64, 255, ${opacity})`;
  };

  const data = {
    labels: chartData.map((point) => point.x),
    datasets: [
      {
        label: "Count",
        data: chartData.map((point) => point.y),
        backgroundColor: chartData
          .map((point) => point.x)
          .map((status_code) => colorMapper(status_code, gradientFactor, backgroundOpacity)),
        borderColor: chartData
          .map((point) => point.x)
          .map((status_code) => colorMapper(status_code, gradientFactor, borderOpacity)),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    legend: {
      position: "right",
    },
    plugins: {
      legend: {
        // position: "right",
      },
    },
  };

  return (
    <div className="donut-chart">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DonutChart;
