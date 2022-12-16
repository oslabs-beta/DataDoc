import React from "react";
import DonutChart from "../components/DonutChart.jsx";
import Histogram from "../components/Histogram.jsx";
import '../styles/Charts.scss';

const ChartsContainer = (props) => {
  return (
    <div class="charts-container">
      <Histogram />
      <DonutChart />
    </div>
  );
};

export default ChartsContainer;
