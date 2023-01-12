import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FlashError from "../components/FlashError.jsx";
import ChartsContainer from "./ChartsContainer.jsx";
import LogTable from "../components/LogTable.jsx";

const Dashboard = (props) => {

  const location = useLocation();
  const { workspaceId, endpointId, method, path } = location.state;
  
  return (
    <>
      <ChartsContainer 
        workspaceId={workspaceId}
        endpointId={endpointId}
        method={method}
        path={path}
      />
      <LogTable />
    </>
  );
};

export default Dashboard;
