import { CssBaseline, ThemeProvider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ColorModeContext, useMode } from "../theme.js";

import Home from "../components/Home.jsx";
import WorkspaceCard from "../components/WorkspaceCard.jsx";
import WorkspaceView from "./WorkspaceView.jsx";
import Settings from "../components/Settings.jsx";
import URI from "../components/URI.jsx";
import WorkspaceInfo from "../components/WorkspaceInfo.jsx";
import Dashboard from "./Dashboard.jsx";
import SimulationView from "./SimulationView.jsx";
import DrawerContents from "./DrawerContents.jsx";
// import NavBar from "./NavBar.jsx";
import SideBar from "./NavBar.jsx";
import TopBar from "./TopBar.jsx";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

import "../styles/globals.scss";

import { styled, useTheme } from "@mui/material/styles";
import { Menu, ChevronLeft, ChevronRight } from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer as MuiDrawer,
  AppBar as MuiAppBar,
  Toolbar,
  IconButton,
  List,
  Typography,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";

const drawerWidth = 270;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: "hidden"
});
const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
});
const DrawerSection = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme)
  })
}));

const App = () => {
  const [theme, colorMode] = useMode();
  const [open, setOpen] = useState(false);
  const [showSettingsPopup, setShowSettingsPopup] = useState(false);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Box sx={{ display: "flex" }}>
          <Router>
            {/* Top Toolbar */}
            <AppBar position="fixed" open={open} color="secondary">
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{
                    marginRight: 5,
                    ...(open && { display: "none" })
                  }}
                >
                  <Menu />
                </IconButton>
                <TopBar 
                  showsettingspopup={showSettingsPopup}
                  setshowsettingspopup={setShowSettingsPopup}
                />
              </Toolbar>
            </AppBar>
            {/* <TopBar position="fixed" open={open} drawerwidth={drawerWidth} color="secondary" handledraweropen={handleDrawerOpen} /> */}

            {/* Drawer */}
            <Drawer variant="permanent" open={open}>
              <DrawerSection>
                <IconButton onClick={handleDrawerClose}>
                  <ChevronLeft />
                </IconButton>
              </DrawerSection>
              <Divider />
              <DrawerContents
                open={open}
                showsettingspopup={showSettingsPopup}
                setshowsettingspopup={setShowSettingsPopup}
              />
            </Drawer>
            {/* <SideBar open={open} theme={theme} handledrawerclose={handleDrawerClose} /> */}


            {/* Main components */}
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <DrawerSection />
              <div className="fullApp">
                <div className="content">
                  <main>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      {/* <Route path="/urilist/:id" element={<WorkspaceInfo />} /> */}
                      <Route path="/workspace/:workspaceId" element={<WorkspaceView />} />
                      <Route path="/uri" element={<URI />} />
                      <Route path="/uri/:id" element={<Dashboard />} />
                      <Route path="/dashboard/:id" element={<Dashboard />} />
                      <Route path="/settings" element={<Settings />} />
                      {/* <Route path="/workspaces" element={<Workspace />} /> */}
                      <Route
                        path="/simulation/:id"
                        element={<SimulationView />}
                      />
                    </Routes>
                    <Settings
                      showsettingspopup={showSettingsPopup}
                      setshowsettingspopup={setShowSettingsPopup}
                    />
                  </main>
                </div>
              </div>
            </Box>
          </Router>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
