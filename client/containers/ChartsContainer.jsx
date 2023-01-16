import { Box, Card, ToggleButton, ToggleButtonGroup, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useEffect, useState } from "react";
import DonutChart from "../components/DonutChart.jsx";
import Histogram from "../components/Histogram.jsx";
import LineChart from "../components/LineChart.jsx";
import "../styles/Charts.scss";
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
  const [range, setRange] = useState("1m");

  const handleRangeChange = (event, newRange) => newRange ? setRange(newRange) : setRange(range);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    if (isMonitoring) {
      setInterval(() => {
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
      }, 2000);
    }
  }, []);

  useEffect(() => {
    fetch(`${SERVER_URL}/chartData/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ range })
    })
  }, [range])

  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "270px",
    width: "100%",
    borderRadius: 3,
    p: 3,
    backgroundColor: `${colors.secondary[100]}`
  };

  const toggleButtonGroupStyle = {
    alignSelf: 'end',
    mb: 2,
  };

  const toggleButtonStyle = {
    borderRadius: 2,
    px: 1.5,
    py: 0.375,
  }

  return (
    <>
      <Box className="charts-container" sx={{
        display: "flex",
        flexDirection: "column",
      }}>
        <ToggleButtonGroup
          value={range}
          onChange={handleRangeChange}
          exclusive
          color="secondary"
          size="large"
          sx={toggleButtonGroupStyle}
        >
          {/* <ToggleButton value="30s" sx={toggleButtonStyle}>30s</ToggleButton> */}
          <ToggleButton value="1m" sx={toggleButtonStyle}>1m</ToggleButton>
          <ToggleButton value="5m" sx={toggleButtonStyle}>5m</ToggleButton>
          <ToggleButton value="30m" sx={toggleButtonStyle}>30m</ToggleButton>
        </ToggleButtonGroup>
        <Grid container spacing={2} sx={{width:"100%"}}>
          {/* {orderedGridItems} */}
          <Grid item sm={12} md={7}>
            <Card sx={cardStyle}>
              <LineChart
                chartData={chartsData.respTimeLineData || []}
                chartTitle="Response Time"
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
                chartTitle="Request Frequency"
                chartLabel="Requests"
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
