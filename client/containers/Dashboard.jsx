import React, { useEffect, useState } from "react";
import FlashError from "../components/FlashError.jsx";
import ChartsContainer from "./ChartsContainer.jsx";
import LogTable from "../components/LogTable.jsx";

const Dashboard = (props) => {
  
  return (
    <>
      <ChartsContainer />
      <LogTable />
    </>
  );
};

export default Dashboard;
