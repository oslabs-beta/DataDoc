import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

const Histogram = (props) => {

  const removeEmptyBins = (histData) => {
    const newData = [];
    for (let i = 0; i < histData.length; i++) {
      const someInLaterBins = histData.slice(i).some((dataPoint) => dataPoint.y > 0)
      if (someInLaterBins) {
        newData.push(histData[i]);
      } else {
        break;
      }
    }
    return newData;
  };

  const chartData = removeEmptyBins(props.chartData) || [];

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
        backgroundColor: chartData
          .map((point) => point.x)
          .map((e, i) => {
            return `rgba(${64 + 32 * i}, ${255 - 16 * i}, 64, 0.8)`;
          }),
        barPercentage: 1.0,
        categoryPercentage: 1.0,
        borderWidth: 1.0
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top"
      },
      title: {
        display: true,
        text: "Response Time Distribution"
      }
    }
  };

  return (
    <div className="histogram">
      <Bar data={data} options={options} />
    </div>
  );
};

export default Histogram;
