import {
  Chart as ChartJS, Filler, Legend, LinearScale, LineElement, PointElement, TimeScale, Title,
  Tooltip
} from "chart.js";
import "chartjs-adapter-moment";
import React from "react";
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
            for (const stepSize of [0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50, 100, 200, 500, 1000]) {
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
                width: "100%",
                cursor: "crosshair"
              }}
            />
    //       </div>
    //     {/* </div> */}
    //   {/* </div> */}
    // </>
  );
};

export default LineChart;
