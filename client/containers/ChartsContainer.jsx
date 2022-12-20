import React from "react";
import LineChart from "../components/LineChart.jsx";
import DonutChart from "../components/DonutChart.jsx";
import Histogram from "../components/Histogram.jsx";
import '../styles/Charts.scss';
import { useParams } from "react-router-dom";

const ChartsContainer = (props) => {
  const {id} = useParams()

  console.log('THIS IS THE ID: ', id)

  return (
    <div>
      <h1>welcome</h1>
    <div className="charts-container">
      <LineChart id={id}/>
      <Histogram id={id}/>
      <LineChart id={id}/>
      <DonutChart id={id}/>
    </div>
    </div>
  );
};

export default ChartsContainer;
