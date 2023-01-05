import React, { useEffect, useState } from "react";
import FlashError from "../components/FlashError.jsx";
import ChartsContainer from "./ChartsContainer.jsx";

const Dashboard = (props) => {

  console.log('CHARTS dashboard PROPS: ', props.state)

  return (
    <>
      <ChartsContainer />
      <h1>Other Dashboard Components</h1>
    </>
  );
};

export default Dashboard;
