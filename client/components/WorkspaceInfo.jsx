import { PlayArrow, Stop, TimerOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonGroup,
  Input, Typography
} from "@mui/material";
import React, { useState } from "react";
import FlashError from "./FlashError.jsx";

const WorkspaceInfo = (props) => {
  const {
    URIList,
    setURIList,
    workspaceId,
    name,
    domain,
    port,
    metricsPort,
    isMonitoring,
    setIsMonitoring,
    getURIListFromServer
  } = props;
  const [errorMessage, setErrorMessage] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [pingInterval, setPingInterval] = useState(1);

  const minPingInterval = 0.5;

  // const inputHandler = (e) => {
  //   // * Convert input text to lower case
  //   let lowerCase = e.target.value.toLowerCase();
  //   setSearch(lowerCase);
  // };

  // const getURIListFromServer = () => {
  //   fetch(
  //     `http://localhost:${process.env.PORT}/routes/server?metrics_port=${metricsPort}`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setURIList(data);
  //     })
  //     .catch((err) => {
  //       setErrorMessage("Invalid server fetch request for the URI List");
  //       // * reset the error message
  //       setTimeout(() => setErrorMessage(""), 5000);
  //     });
  // };

  // const getURIListFromDatabase = (workspace_id) => {
  //   fetch(`http://localhost:${process.env.PORT}/routes/${workspace_id}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setURIList(data);
  //     })
  //     .catch((err) => {
  //       setErrorMessage("Invalid db fetch request for the URI List");
  //       // * reset the error message
  //       setTimeout(() => setErrorMessage(""), 5000);
  //     });
  // };

  const handleStartMonitoringClick = (e) => {
    if (pingInterval === undefined || pingInterval < minPingInterval) return;
    e.preventDefault();
    fetch(`http://localhost:${process.env.PORT}/monitoring`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        active: true,
        domain,
        interval: pingInterval,
        metricsPort,
        mode: "monitoring",
        port,
        verbose: true,
        workspaceId
      })
    })
      .then((serverResponse) => {
        if (serverResponse.ok) {
          setIsMonitoring(true);
        }
      })
      .catch((err) => {
        console.log("there was an error attempting to start monitoring: ", err);
        setErrorMessage(
          `Invalid POST request to start monitoring, error: ${err}`
        );
      });
  };

  const handleStopMonitoringClick = (e) => {
    e.preventDefault();
    setIsMonitoring(false);
    fetch(`http://localhost:${process.env.PORT}/monitoring`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        active: false,
        verbose: true,
        workspaceId
      })
    })
      .then((serverResponse) => {
        if (serverResponse.ok) {
          setIsMonitoring(false);
        }
      })
      .catch((err) => {
        console.log("there was an error attempting to stop monitoring: ", err);
        setErrorMessage(
          `Invalid POST request to stop monitoring, error: ${err}`
        );
      });
  };

  return (
    <Box
      mb={2}
    >
      <Typography variant="h2" fontWeight={700}>
        {name}
      </Typography>
      <Typography variant="h4" fontWeight={700}>
        {domain}{((port !== undefined && typeof port === "number") ? ':' + port : '')}
      </Typography>
      <Typography variant="h5">Monitoring Frequency</Typography>
      <Input
        label="Ping Interval"
        variant="outlined"
        type="number"
        inputProps={{
          id: "ping-interval",
          type: "number",
          min: `${minPingInterval}`,
          step: 0.5,
          required: true,
          value: pingInterval,
          style: {
            textAlign: "end"
          }
        }}
        startAdornment={<TimerOutlined />}
        endAdornment={<Typography>s</Typography>}
        fullWidth={true}
        size="lg"
        sx={{ width: 70 }}
        onChange={(e) => {
          setPingInterval(e.target.value);
        }}
      />
      <br></br>
      <ButtonGroup variant="contained" color="secondary">
        <Button
          disabled={isMonitoring}
          onClick={handleStartMonitoringClick}
          sx={{
            opacity: isMonitoring ? 0.6 : 1,
            width: isMonitoring ? 40 : 60,
            transition: "0.25s",
            ":hover": {
              "transform": "scale(1.05)",
            }
          }}
        >
          <PlayArrow />
        </Button>
        <Button
          disabled={!isMonitoring}
          onClick={handleStopMonitoringClick}
          sx={{
            opacity: isMonitoring ? 1 : 0.6,
            width: isMonitoring ? 60 : 40,
            transition: "0.25s",
            ":hover": {
              "transform": "scale(1.05)",
            }
          }}
        >
          <Stop />
        </Button>
      </ButtonGroup>
      {/* </form> */}
      <br></br>
      <div className="URIEntries">
        {errorMessage !== "" ? (
          <FlashError errorMessage={errorMessage} />
        ) : null}
        {/* <form>
          <input
            placeholder="Metrics server port"
            type="number"
            defaultValue={9991}
            onChange={(e) => {
              setMetricsPort(e.target.value);
            }}
          ></input>
          <button
            onClick={(e) => {
              e.preventDefault();
              getURIListFromServer();
            }}
          >
            Refresh
          </button>
        </form> */}
        {/* <table>
          <thead>
            <tr>
              <th>Tracking</th>
              <th>Path</th>
              <th>Method</th>
              <th>Status Code</th>
              <th>Simulate User Activity</th>
            </tr>
          </thead>
          <tbody>
            {URIList.filter((uriObject) => {
              if (searchInput === "") {
                return uriObject;
              } else if (uriObject.path.toLowerCase() == searchInput) {
                return uriObject.path;
              }
            }).map((element) => {
              return (
                <URI
                  key={crypto.randomUUID()}
                  path={element.path}
                  method={element.method}
                  status={element.status}
                  checked={element.tracking}
                  addToTracking={addToTracking}
                  removeFromTracking={removeFromTracking}
                />
              );
            })}
          </tbody>
        </table> */}
      </div>
    </Box>
  );
};

export default WorkspaceInfo;
