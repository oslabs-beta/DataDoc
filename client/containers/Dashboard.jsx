import React, { useEffect, useState } from "react";
import FlashError from "../components/FlashError.jsx";
import ChartsContainer from "./ChartsContainer.jsx";

const Dashboard = (props) => {
  return (
    <>
      <ChartsContainer />
      <h1>Other Dashboard Components</h1>
    </>
  );
};

export default Dashboard;
