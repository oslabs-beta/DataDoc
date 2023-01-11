
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Typography } from "@mui/material";
import WorkspaceInfo from "../components/WorkspaceInfo.jsx"
import URITable from "../components/URITable.jsx";

const WorkspaceView = () => {
  const location = useLocation();
  const { workspaceId, name, domain, port } = location.state;
  const [URIList, setURIList] = useState([]);
  const [isMonitoring, setIsMonitoring] = useState();
  const [metricsPort, setMetricsPort] = useState(location.state.metricsPort);

  useEffect(() => {
    fetch(`${process.env.SERVER_URL}/monitoring/${workspaceId}`)
    .then((serverResponse) => {
      return serverResponse.json();
    })
    .then((responseJson) => {
      setIsMonitoring(responseJson);
    })
  })

  useEffect(() => {
    getURIListFromDatabase(workspaceId);
  }, [workspaceId]);

  const getURIListFromServer = (metricsPortArg) => {
    console.log(`http://localhost:${process.env.PORT}/routes/server?metricsPort=${metricsPortArg}`)
    fetch(
      `http://localhost:${process.env.PORT}/routes/server?metricsPort=${metricsPortArg}`
    )
      .then((response) => response.json())
      .then((data) => {
        setURIList(data);
      })
      .catch((err) => {
        setErrorMessage("Invalid server fetch request for the URI List");
        // * reset the error message
        setTimeout(() => setErrorMessage(""), 5000);
      });
  };

  const getURIListFromDatabase = (workspaceId) => {
    fetch(`http://localhost:${process.env.PORT}/routes/${workspaceId}`)
      .then((response) => response.json())
      .then((data) => {
        setURIList(data);
      })
      .catch((err) => {
        setErrorMessage("Invalid db fetch request for the URI List");
        // * reset the error message
        setTimeout(() => setErrorMessage(""), 5000);
      });
  };

  const updateTrackingInDatabaseById = async (updatedEndpoint) => {
    // console.log("updateTrackingInDatabaseById")
    fetch(`http://localhost:9990/endpoints/${updatedEndpoint._id}`, {
      method: `PUT`,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedEndpoint)
    }).then((serverResponse) => {
      if (serverResponse.ok) {
        const updatedURIList = URIList.map((URI) => {
          return URI._id === updatedEndpoint._id ? updatedEndpoint : URI;
        });
        setURIList(updatedURIList);
      }
    });
    return;
  };

  return (
    <>
      <WorkspaceInfo
        URIList={URIList}
        workspaceId={workspaceId}
        setURIList={setURIList}
        name={name}
        domain={domain}
        port={port}
        metricsPort={metricsPort}
        isMonitoring={isMonitoring}
        setIsMonitoring={setIsMonitoring}
        />
      <URITable
        workspaceId={workspaceId}
        metricsPort={metricsPort}
        rows={URIList.map((URI) => {
          return {
            _id: URI._id, // hidden column
            _tracking: URI.tracking, // hidden column
            path: URI.path,
            method: URI.method,
            status_code: URI.statusCode || "N/A"
          };
        })}
        updateTrackingInDatabaseById={updateTrackingInDatabaseById}
        getURIListFromServer={getURIListFromServer}
      />
    </>
  );
};

export default WorkspaceView;