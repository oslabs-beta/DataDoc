import WorkspaceInfo from "../components/WorkspaceInfo.jsx"

// console.log(URIList);

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Typography } from "@mui/material";
import URITable from "../components/URITable.jsx";

const WorkspaceView = () => {
  const location = useLocation();
  const { workspaceId, name, domain, port, metricsPort } = location.state;
  const [URIList, setURIList] = useState([]);
  const [trackingList, setTrackingList] = useState([]);

  useEffect(() => {
    getURIListFromDatabase(workspaceId);
  }, [workspaceId]);

  // console.table(location)
  // console.table(location.state);

  const getURIListFromServer = () => {
    fetch(
      `http://localhost:${process.env.PORT}/routes/server?metrics_port=${metricsPort}`
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
      />
      <URITable
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