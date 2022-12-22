import React from "react";
import LineChart from "../components/LineChart.jsx";
import DonutChart from "../components/DonutChart.jsx";
import Histogram from "../components/Histogram.jsx";
import "../styles/Charts.scss";
import { useParams } from "react-router-dom";
import Test from "../components/test.jsx";

const ChartsContainer = (props) => {
  const { id } = useParams();

  // console.log("THIS IS THE ID: ", id);

  return (
    <>
      <h1>Charts Container</h1>
      <div className="charts-container">
        <LineChart id={id} />
        <Histogram id={id} />
        <LineChart id={id} />
        <DonutChart id={id} />
      </div>
    </>
  );
};

export default ChartsContainer;
