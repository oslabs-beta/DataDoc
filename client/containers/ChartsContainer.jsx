import React, { useEffect } from "react";
import LineChart from "../components/LineChart.jsx";
import DonutChart from "../components/DonutChart.jsx";
import Histogram from "../components/Histogram.jsx";
import "../styles/Charts.scss";
import { useParams, useLocation } from "react-router-dom";
import Test from "../components/test.jsx";

const ChartsContainer = (props) => {
  const {id} = useParams()
  const location = useLocation()
  console.log('THIS IS THE LOCATION: ', location)
  const {method} = location.state
  const {path} = location.state
  const {setMonitoring, setSimulation} = props

  // console.log('ID: ', id)
  console.log('METHOD: ', method)
  console.log('PATH: ', path)

  useEffect(()=>{
    setMonitoring(true)
    setSimulation(false)
  })

  

  return (
    <>
      <h1>Charts Container</h1>
      <h3>Path: {path}</h3>
      <h3>Method: {method}</h3>
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
