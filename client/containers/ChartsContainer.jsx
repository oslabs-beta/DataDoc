import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import LineChart from "../components/LineChart.jsx";
import DonutChart from "../components/DonutChart.jsx";
import Histogram from "../components/Histogram.jsx";
import "../styles/Charts.scss";
import { useParams, useLocation } from "react-router-dom";

const { SERVER_URL } = process.env;

const ChartsContainer = (props) => {
  const { id } = useParams();
  const [chartsData, setChartsData] = useState({});
  
  const location = useLocation();
  const { method, path } = location.state;

  setTimeout(() => {
    const encodedPath = path.replaceAll("/", "%2F");
    fetch(`${SERVER_URL}/chartdata/?method=${method}&path=${encodedPath}`, {
      headers: { 'Content-Encoding': 'gzip' },
    })
      .then((response) => response.json())
      .then((dataObj) => {
        setChartsData(dataObj);
      })
      .catch((err) => {
        console.log(
          `there was an error in the charts container fetch request, error: ${err}`
        );
      });
  }, 1000);

  return (
    <>
      <h3>Path: {path}</h3>
      <h3>Method: {method}</h3>
      <div className="charts-container">
        <Grid container spacing={3}>
          <Grid item xs={12/1} md={12/2}>
          <LineChart id={id} chartData={chartsData.respTimeLineData || [] } chartTitle="Response Time over Time" chartLabel="Time (in ms)" />
          </Grid>
          <Grid item xs={12/1} md={12/2}>
          <Histogram id={id} chartData={chartsData.respTimeHistData || [] } />
          </Grid>
          <Grid item xs={12/1} md={12/2}>
          <LineChart id={id} chartData={chartsData.reqFreqLineData || [] } chartTitle="Request Frequency over Time" chartLabel="Count" />
          </Grid>
          <Grid item xs={12/1} md={12/2}>
          <DonutChart id={id} chartData={chartsData.statusPieData || [{ x: "N/A", y: 1 }] } />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default ChartsContainer;
