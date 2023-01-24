import { useTheme } from "@mui/material";
import { ArcElement, Chart as ChartJS, Legend, Title, Tooltip } from "chart.js";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { tokens } from "../theme.js";

const DonutChart = (props) => {
  const { id, chartData } = props;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  ChartJS.register(ArcElement, Tooltip, Title, Legend);

  const backgroundOpacity = 0.7;
  const borderOpacity = 0.25;
  const gradientFactor = 4;
  const colorMapper = (value, gradientFactor, opacity) => {
    if (value === "N/A") {
      return `rgba(192, 192, 192, ${opacity})`
    }
    else if (value < 200)
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

  const convertCountToPercentage = (counts) => {
    const total = counts.reduce((curr, acc) => curr + acc, 0);
    return counts.map(count => count / total * 100);
  }

  const data = {
    labels: chartData.map((point) => String(point.x)),
    datasets: [
      {
        label: "Percentage",
        data: convertCountToPercentage(chartData.map((point) => point.y)),
        backgroundColor: chartData
          .map((point) => point.x)
          .map((status_code) =>
            colorMapper(status_code, gradientFactor, backgroundOpacity)
          ),
        borderColor: chartData
          .map((point) => point.x)
          .map((status_code) =>
            colorMapper(status_code, gradientFactor, borderOpacity)
          ),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    resizeDelay: 200,
    plugins: {
      title: {
        display: true,
        text: 'Status Code Distribution',
      },
      legend: {
        display: true,
        position: "left",
        align: "center",
        labels: {
          padding: 0,
        }
      },
    },
  };

  return (
    // <div className="donut-chart" style={{position: "relative"}}>
      <Doughnut 
        data={data} 
        options={options}
        style={{
          height: "100%",
          width: "100%"
        }}
      />
    // </div>
  );
};

export default DonutChart;
