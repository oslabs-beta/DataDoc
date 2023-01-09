import { CssBaseline, ThemeProvider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ColorModeContext, useMode } from "./theme.js";

// import Back from "../components/NavButtons.jsx";
import Forward from "../components/Forward.jsx";
import Home from "../components/Home.jsx";
import Settings from "../components/Settings.jsx";
import URI from "../components/URI.jsx";
import URIList from "../components/URIList.jsx";
import Workspace from "../components/Workspace.jsx";
import Dashboard from "./Dashboard.jsx";
import Development from "./Development.jsx";
import NavBar from "./NavBar.jsx";
import Topbar from "./Topbar.jsx";
// import HomeButton from "../components/HomeButton.jsx";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

import "../styles/globals.scss";

const App = () => {
  // const [simulation, setSimulation] = useState(false);
  // const [monitoring, setMonitoring] = useState(false);
  const [theme, colorMode] = useMode();
  const [mainWidth, setMainWidth] = useState("100vw");
  const [mainOffset, setMainOffset] = useState("0px");

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div className="fullApp">
            <NavBar setMainWidth={setMainWidth} setMainOffset={setMainOffset} />
            {/* <Sidebar /> */}
            <div className="content">
              <main
                style={{
                  boxSizing: "border-box",
                  MozBoxSizing: "border-box",
                  WebkitBoxSizing: "border-box",
                  padding: "10px",
                  // width: "100%",
                  width: mainWidth,
                  marginLeft: mainOffset,
                  transition: "width 0.5s, margin-left 0.5s"
                }}
              >
                <Topbar />
                {/* <Header
                setSimulation={setSimulation}
                setMonitoring={setMonitoring}
              /> */}
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/urilist/:id" element={<URIList />} />
                  <Route path="/uri" element={<URI />} />
                  <Route path="/uri/:id" element={<Dashboard />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/development/:id" element={<Development />} />
                  <Route path="/workspaces" element={<Workspace />} />
                </Routes>
              </main>
            </div>
          </div>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
