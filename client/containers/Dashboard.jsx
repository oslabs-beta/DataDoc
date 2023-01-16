import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material"
import FlashError from "../components/FlashError.jsx";
import ChartsContainer from "./ChartsContainer.jsx";
import LogTable from "../components/LogTable.jsx";

const Dashboard = (props) => {

  const { workspaceId, endpointId, name, domain, port, method, path, isMonitoring, setIsMonitoring } = useLocation().state;
  
  return (
    <>
      <Box
        mb={2}
      >
        <Box
          component="div"
          color="secondary"
          mr={0.5}
          sx={{
            display: "inline-flex",
            width: "fit-content",
            color: "white",
            backgroundColor: (((method) => {
              switch (method) {
                case "GET": return "green"
                case "POST": return "yellow"
                case "PUT": return "blue"
                case "PATCH": return "grey"
                case "DELETE": return "red"
                default: return "white"
              }
            })(method)),
            borderRadius: 1.5,
            px: 0.5,
            py: 0.125,
          }}
        >
          <Typography variant="h5">
            {method}
          </Typography>
        </Box>
        <Typography 
          variant="h5"
          sx={{
            display: "inline-flex",
          }}
        >
          {`http://${domain}${typeof port === "number" ? ':' + port : ''}${path}`}
        </Typography>
      </Box>
      <ChartsContainer 
        workspaceId={workspaceId}
        endpointId={endpointId}
        name={name}
        domain={domain}
        port={port}
        method={method}
        path={path}
        isMonitoring={isMonitoring}
        />
      {/* <LogTable 
        method={method}
        path={path}
        isMonitoring={isMonitoring}
      /> */}
    </>
  );
};

export default Dashboard;
