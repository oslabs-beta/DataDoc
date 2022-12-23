import React, { useEffect, useState } from "react";

import NavBar from "./NavBar.jsx";
import Development from "./Development.jsx";
import Production from "./Production.jsx";
import Header from "./Header.jsx";
import Home from "../components/Home.jsx";
import HomeButton from "../components/HomeButton.jsx";
import ChartsContainer from "./ChartsContainer.jsx";
import URIList from "../components/URIList.jsx";
import URI from "../components/URI.jsx";
import Settings from "../components/Settings.jsx";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

import "../styles/globals.scss";

const App = () => {
  const [monitoring, setMonitoring] = useState(false)
  const [simulation, setSimulation] = useState(false)

  return (
    <Router>
      <div className="fullApp">
        <NavBar/>
        <Header simulation={simulation} monitoring={monitoring}/>
        <div className="content">
          <Routes>
            <Route path='/' element={<Home setMonitoring={setMonitoring} setSimulation={setSimulation}/>}/>
            <Route path='/urilist' element ={<URIList setMonitoring={setMonitoring} setSimulation={setSimulation}/>}/>
            <Route path='/uri' element={<URI setMonitoring={setMonitoring}/>}/>
            <Route path='/uri/:id' element={<ChartsContainer setMonitoring={setMonitoring} setSimulation={setSimulation}/>}/>
            <Route path='/settings' element={<Settings />}/>
            <Route path='/development/:id' element={<Development setSimulation={setSimulation}/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}


export default App;
