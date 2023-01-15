import React, { useEffect, useState } from "react";
import { Card } from "@mui/material";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

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

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const removeEmptyBins = (histData) => {
    const newData = [];
    for (let i = 0; i < histData.length; i++) {
      const someInLaterBins = histData.slice((i > 0 ? i - 1 : 0)).some((dataPoint) => dataPoint.y > 0)
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
    <Card sx={{height: "350px", padding:"30px", backgroundColor:`${colors.secondary[100]}`}}>
      <div className="histogram" style={{position: "relative"}}>
        <Bar data={data} options={options} />
      </div>
    </Card>
  );
};

export default Histogram;
