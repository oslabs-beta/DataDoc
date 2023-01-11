import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import URITable from "../components/URITable.jsx";

const WorkspaceView = () => {
  const location = useLocation();
  const { workspace_id } = location.state;
  const [URIList, setURIList] = useState([]);
  const [trackingList, setTrackingList] = useState([]);

  useEffect(() => {
    getURIListFromDatabase(workspace_id);
  }, [workspace_id]);

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

  const getURIListFromDatabase = (workspace_id) => {
    fetch(`http://localhost:${process.env.PORT}/routes/${workspace_id}`)
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
