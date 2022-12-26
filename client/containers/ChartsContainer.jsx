import React, { useEffect, useState } from "react";
import LineChart from "../components/LineChart.jsx";
import DonutChart from "../components/DonutChart.jsx";
import Histogram from "../components/Histogram.jsx";
import "../styles/Charts.scss";
import { useParams, useLocation } from "react-router-dom";

const ChartsContainer = (props) => {
  const { id } = useParams();
  const location = useLocation();
  const { method } = location.state;
  const { path } = location.state;
  const [respTimeLineData, setRespTimeLineData] = useState([]);
  const [reqFreqLineData, setReqFreqLineData] = useState([]);
  const [respTimeHistData, setRespTimeHistData] = useState([]);
  const [statusPieData, setStatusPieData] = useState([]);

  const { SERVER_URL } = process.env;

  setTimeout(() => {
    const encodedPath = path.replaceAll("/", "%2F");
    fetch(`${SERVER_URL}/chartdata/?method=${method}&path=${encodedPath}`)
      .then((response) => response.json())
      .then((dataObj) => {
        setRespTimeLineData(dataObj.respTimeLineData);
        setReqFreqLineData(dataObj.reqFreqLineData);
        setRespTimeHistData(dataObj.respTimeHistData);
        setStatusPieData(dataObj.statusPieData);
      })
      .catch((err) => {
        console.log(
          `there was an error in the charts container fetch request, error: ${err}`
        );
      });
  }, 1000);

  return (
    <>
      <h1>Dashboard</h1>
      <h3>Path: {path}</h3>
      <h3>Method: {method}</h3>
      <div className="charts-container">
        <LineChart id={id} chartData={respTimeLineData} />
        <Histogram id={id} chartData={respTimeHistData} />
        <LineChart id={id} chartData={reqFreqLineData} />
        <DonutChart id={id} chartData={statusPieData} />
      </div>
    </>
  );
};

export default ChartsContainer;
