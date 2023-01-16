import React, { useEffect, useState } from "react";
import { Box, Card, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import LineChart from "../components/LineChart.jsx";
import DonutChart from "../components/DonutChart.jsx";
import Histogram from "../components/Histogram.jsx";
import "../styles/Charts.scss";
import { useParams } from "react-router-dom";
import { tokens } from "../theme.js";

const { SERVER_URL } = process.env;

const ChartsContainer = (props) => {

  const {
    workspaceId,
    name,
    domain,
    port,
    metricsPort,
    endpointId,
    method,
    path,
    isMonitoring
  } = props;
  const [chartsData, setChartsData] = useState({});

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  if (isMonitoring) {
    setTimeout(() => {
      const encodedPath = path.replaceAll("/", "%2F");
      fetch(
        `${SERVER_URL}/chartdata/?workspaceId=${workspaceId}&method=${method}&path=${encodedPath}`,
        {
          method: "GET",
          headers: { "Content-Encoding": "gzip" }
        }
      )
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
  }

  const cardStyle = {
    display: "flex",
    justifyContent: "center",
    height: "270px",
    borderRadius: 2,
    p: 2,
    backgroundColor: `${colors.secondary[100]}`
  };

  return (
    <>
      <Box className="charts-container">
        <Grid container spacing={3}>
          <Grid item sm={12} md={7}>
            <Card sx={cardStyle}>
              <LineChart
                chartData={chartsData.respTimeLineData || []}
                chartTitle="Response Time over Time"
                chartLabel="Time (in ms)"
              />
            </Card>
          </Grid>
          <Grid item sm={12} md={5}>
            <Card sx={cardStyle}>
              <Histogram chartData={chartsData.respTimeHistData || []} />
            </Card>
          </Grid>
          <Grid item sm={12} md={7}>
            <Card sx={cardStyle}>
              <LineChart
                chartData={chartsData.reqFreqLineData || []}
                chartTitle="Request Frequency over Time"
                chartLabel="Count"
              />
            </Card>
          </Grid>
          <Grid item sm={12} md={5}>
            <Card sx={cardStyle}>
              <DonutChart
                chartData={chartsData.statusPieData || [{ x: "N/A", y: 1 }]}
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ChartsContainer;
