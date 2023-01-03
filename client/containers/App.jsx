import React, { useEffect, useState } from "react";
import { ColorModeContext, useMode } from "./theme.js";
import { CssBaseline, ThemeProvider } from "@mui/material";

import NavBar from "./NavBar.jsx";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";
import Back from "../components/Back.jsx"
import Forward from "../components/Forward.jsx"
import Development from "./Development.jsx";
import Production from "./Production.jsx";
import Header from "./Header.jsx";
import Home from "../components/Home.jsx";
import HomeButton from "../components/HomeButton.jsx";
import ChartsContainer from "./ChartsContainer.jsx";
import URIList from "../components/URIList.jsx";
import URI from "../components/URI.jsx";
import Dashboard from "./Dashboard.jsx";
import Settings from "../components/Settings.jsx";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

import "../styles/globals.scss";

const App = () => {

  const [simulation, setSimulation] = useState(false);
  const [monitoring, setMonitoring] = useState(false);
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value = {colorMode}>
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
      <div className="fullApp">
        <NavBar />
        {/* <Sidebar /> */}
        <div className="content">
          <Topbar />
          <Back />
          <Forward />
          <Header setSimulation={setSimulation} setMonitoring={setMonitoring} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/urilist" element={<URIList />} />
            <Route path="/uri" element={<URI />} />
            <Route path="/uri/:id" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/development/:id" element={<Development />} />
          </Routes>
        </div>
      </div>
    </Router>
    </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
