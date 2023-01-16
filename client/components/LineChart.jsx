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
import { tokens } from "../theme.js";

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
        tension: 0.3,
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
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: (() => {
            if (! chartData) return 1;
            const maxYValue = Math.max(...(chartData.map((point) => point.y)));
            // console.table(chartData.map((point) => point.y));
            for (const stepSize of [0.1, 1, 2, 5, 10, 50, 100, 200, 500, 1000]) {
              console.log(`${maxYValue} / ${stepSize} = ${maxYValue/stepSize}}`);
              if (maxYValue / stepSize < 6) return stepSize;
            }
          })()
        }
      }
    },
    animation: {
      duration: 1000,
      // easing: "linear",
    },
    animations: {
      x: {
        duration: 100,
        easing: "linear",
      },
      y: {
        duration: 0,
      },
    }
  };

  return (
    // <>
    //   {/* <div className="chartWrapper"> */}
    //     {/* <div className="chartAreaWrapper"> */}
    //       <div 
    //         className="line-chart" 
    //         // style={{position: "relative"}}
    //       >
            <Line 
              data={data} 
              options={options} 
              style={{
                height: "100%",
                width: "100%"
              }}
            />
    //       </div>
    //     {/* </div> */}
    //   {/* </div> */}
    // </>
  );
};

export default LineChart;
