import React from "react";
import LineChart from "../components/LineChart.jsx";
import DonutChart from "../components/DonutChart.jsx";
import Histogram from "../components/Histogram.jsx";
import '../styles/Charts.scss';

const ChartsContainer = (props) => {
  return (
    <div className="charts-container">
      <LineChart />
      <Histogram />
      <LineChart />
      <DonutChart />
    </div>
  );
};

export default ChartsContainer;
