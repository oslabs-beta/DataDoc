import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Box,
  Button,
  ButtonGroup,
  Input,
  InputBase,
  Typography
} from "@mui/material";
import { PlayArrow, Stop, TimerOutlined } from "@mui/icons-material";
import URI from "./URI.jsx";
import FlashError from "./FlashError.jsx";
import SearchBar from "./SearchBar.jsx";
import { flexbox } from "@mui/system";

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
    <>
      <Typography variant="h2" fontWeight={700}>
        {name}
      </Typography>
      <Typography variant="h2" fontWeight={700}>
        {domain}
      </Typography>
      <Typography variant="h2" fontWeight={700}>
        {port}
      </Typography>
      <Typography variant="h2" fontWeight={700}>
        {metricsPort}
      </Typography>
      {/* <Input 
        type="text" 
        variant="outlined" 
        inputProps={{
          value: name,
          style: {
            disableUnderline: true,
            fontWeight: 700,
          }
        }} 
      /> */}
      {/* <form className="monitoring" > */}
      <label htmlFor="ping-interval">
        <Typography variant="h5">Monitoring Frequency</Typography>
      </label>
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
        startAdornment={<TimerOutlined></TimerOutlined>}
        endAdornment={<Typography>s</Typography>}
        fullWidth={true}
        sx={{ width: 70 }}
        onChange={(e) => {
          setPingInterval(e.target.value);
        }}
      />
      <br></br>
      <ButtonGroup variant="contained" color="secondary">
        <Button
          onClick={handleStartMonitoringClick}
          sx={{
            opacity: isMonitoring ? 0.6 : 1,
          }}
        >
          <PlayArrow />
        </Button>
        <Button
          onClick={handleStopMonitoringClick}
          sx={{
            opacity: isMonitoring ? 1 : 0.6,
          }}
        >
          <Stop />
        </Button>
      </ButtonGroup>
      {/* </form> */}
      <br></br>
      <span>
        <label htmlFor="endpoint-search">Search for a specific endpoint:</label>
        <SearchBar
          id="endpoint-search"
          searchInput={searchInput}
          setSearch={setSearchInput}
        />
      </span>
      <br></br>
      <div className="URIEntries">
        {errorMessage !== "" ? (
          <FlashError errorMessage={errorMessage} />
        ) : null}
        <form>
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
        </form>
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
    </>
  );
};

export default WorkspaceInfo;
