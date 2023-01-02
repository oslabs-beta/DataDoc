import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Settings from "./Settings.jsx";
import URI from "./URI.jsx";
import FlashError from "./FlashError.jsx";
import SearchBar from "./SearchBar.jsx";

const URIList = (props) => {
  const [URIList, setURIList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchInput, setSearch] = useState("");
  const [trackingURI, setTrackingURI] = useState([]);
  const [monitoringFreq, setMonitoringFreq] = useState("");

  const inputHandler = (e) => {
    // * Convert input text to lower case
    let lowerCase = e.target.value.toLowerCase();
    setSearch(lowerCase);
  };

  const addToTracking = (method, path) => {
    const newObject = {
      method: method,
      path: path,
    };
    setTrackingURI((trackingURI) => [...trackingURI, newObject]);
    setTrackingURI((trackingURI) => {
      return trackingURI;
    });
  };

  const removeFromTracking = (method, path) => {
    const updatedTrackingURI = trackingURI.filter((element) => {
      return element.method !== method || element.path !== path;
    });
    setTrackingURI(updatedTrackingURI);
    setTrackingURI((updatedTrackingURI) => {
      return updatedTrackingURI;
    });
  };

  // * Fetch the URI List from the backend when the component mounts
  useEffect(() => {
    fetch(`http://localhost:${process.env.PORT}/routes`)
      .then((response) => response.json())
      .then((data) => {
        setURIList(() => data);
      })
      .catch((err) => {
        setErrorMessage("Invalid fetch request for the URI List");
        // * reset the error message
        setTimeout(() => setErrorMessage(""), 5000);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:${process.env.PORT}/routes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trackingURI),
    })
    .catch((err) => {
      console.log(
        `there was an error sending the URI tracking list, error: ${err}`
      );
      setErrorMessage("Invalid POST request from the URI List");
    });
  }, [trackingURI]);

  const handleStartMonitoringClick = () => {
    fetch(`http://localhost:${process.env.PORT}/monitoring`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        active: true,
        interval: monitoringFreq,
        verbose: true,
      }),
    })
    .catch((err) => {
      console.log("there was an error attempting to start monitoring: ", err);
      setErrorMessage(
        `Invalid POST request to start monitoring, error: ${err}`
      );
    });
  };

  const handleStopMonitoringClick = () => {
    fetch(`http://localhost:${process.env.PORT}/monitoring`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        active: false,
      }),
    })
    .catch((err) => {
      console.log("there was an error attempting to stop monitoring: ", err);
      setErrorMessage(
        `Invalid POST request to stop monitoring, error: ${err}`
      );
    });
  };

  return (
    <div className="URIListContainer">
      <SearchBar searchInput={searchInput} setSearch={setSearch} />
      <br></br>
      <form className="monitoring">
        <label htmlFor="monitoring-time">Set monitoring frequency:</label>
        <input
          type="number"
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
      <Settings />
      <br></br>
      <div className="URIEntries">
        {errorMessage !== "" ? (
          <FlashError errorMessage={errorMessage} />
        ) : null}
        <table>
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
                  addToTracking={addToTracking}
                  removeFromTracking={removeFromTracking}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default URIList;
