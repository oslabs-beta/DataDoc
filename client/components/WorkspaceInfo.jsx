import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import URI from "./URI.jsx";
import FlashError from "./FlashError.jsx";
import SearchBar from "./SearchBar.jsx";
import { flexbox } from "@mui/system";

const WorkspaceInfo = (props) => {
  // const [URIList, setURIList] = useState([]);
  const { URIList, setURIList, workspaceId, name } = props;
  console.table(props);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [monitoringFreq, setMonitoringFreq] = useState("");
  // const [metricsPort, setMetricsPort] = useState(9991);


  const minFreq = 0.5;

  // const inputHandler = (e) => {
  //   // * Convert input text to lower case
  //   let lowerCase = e.target.value.toLowerCase();
  //   setSearch(lowerCase);
  // };

  // // * Fetch the URI List from the database when the component mounts
  // useEffect(() => {
  //   getURIListFromDatabase(workspaceId);
  // }, [workspaceId]);

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

  // const addToTracking = (method, path) => {
  //   const newURIList = [...URIList];
  //   for (const URI of newURIList) {
  //     if (URI.method === method && URI.path === path) {
  //       URI.tracking = true;
  //       break;
  //     }
  //   }
  //   setURIList(newURIList);
  // };

  // const removeFromTracking = (method, path) => {
  //   const newURIList = [...URIList];
  //   for (const URI of newURIList) {
  //     if (URI.method === method && URI.path === path) {
  //       URI.tracking = false;
  //       break;
  //     }
  //   }
  //   setURIList(newURIList);
  // };

  // // * Update the list of tracked URIs in the server whenever a checkbox changes
  // useEffect(() => {
  //   // if (firstRender) {
  //   //   firstRender = false;
  //   //   console.log(firstRender);
  //   //   // setFirstLoad(false);
  //   //   return;
  //   // }
  //   fetch(`http://localhost:${process.env.PORT}/routes/${workspaceId}`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(
  //       URIList?.map((URI) => ({
  //         method: URI.method,
  //         path: URI.path,
  //         tracking: URI.tracking || false
  //       }))
  //     )
  //   }).catch((err) => {
  //     console.log(
  //       `there was an error sending the URI tracking list, error: ${err}`
  //     );
  //     setErrorMessage("Invalid POST request from the URI List");
  //   });
  // }, [URIList]);

  // const handleStartMonitoringClick = (e) => {
  //   if (monitoringFreq === undefined || monitoringFreq < minFreq) return;
  //   e.preventDefault();
  //   fetch(`http://localhost:${process.env.PORT}/monitoring`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       active: true,
  //       interval: monitoringFreq,
  //       verbose: true,
  //       metricsPort: metricsPort,
  //       metricsPort: metricsPort
  //     })
  //   }).catch((err) => {
  //     console.log("there was an error attempting to start monitoring: ", err);
  //     setErrorMessage(
  //       `Invalid POST request to start monitoring, error: ${err}`
  //     );
  //   });
  // };

  // const handleStopMonitoringClick = (e) => {
  //   e.preventDefault();
  //   fetch(`http://localhost:${process.env.PORT}/monitoring`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       active: false,
  //       verbose: true
  //     })
  //   }).catch((err) => {
  //     console.log("there was an error attempting to stop monitoring: ", err);
  //     setErrorMessage(`Invalid POST request to stop monitoring, error: ${err}`);
  //   });
  // };

  return (
    <>
      <Typography variant="h2" fontWeight={700}>
        {name}
      </Typography>
      <form className="monitoring">
        <br></br>
        <label htmlFor="monitoring-time">Set monitoring frequency:</label>
        <input
          type="number"
          min={`${minFreq}`}
          step="0.1"
          id="monitoring-time"
          value={monitoringFreq}
          placeholder="5 seconds"
          size="30"
          required
          onChange={(e) => setMonitoringFreq(e.target.value)}
        ></input>
        <br></br>
        <div>
          <button onClick={(e) => handleStartMonitoringClick(e)}>
            Start Monitoring
          </button>
          <button onClick={(e) => handleStopMonitoringClick(e)}>
            Stop Monitoring
          </button>
        </div>
      </form>
      <br></br>
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
