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

const drawerWidth = 300;
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
const DrawerHeader = styled("div")(({ theme }) => ({
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
  // const theme = useTheme();
  const [theme, colorMode] = useMode();

  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>

        <Router>

        <Box sx={{ display: "flex" }}>
          <CssBaseline />
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
              <Topbar />
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              {["Inbox", "Starred", "Send email", "Drafts"].map(
                (text, index) => (
                  <ListItem key={text} disablePadding sx={{ display: "block" }}>
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center"
                        }}
                      >
                        <Menu />
                      </ListItemIcon>
                      <ListItemText
                        primary={text}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </ListItem>
                )
              )}
            </List>
            <Divider />
            <List>
              {["All mail", "Trash", "Spam"].map((text, index) => (
                <ListItem key={text} disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center"
                      }}
                    >
                      <Menu />
                    </ListItemIcon>
                    <ListItemText
                      primary={text}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />

            {/* <Router> */}
              <div className="fullApp">
                <div className="content">
                  <main
                  // style={{
                  //   boxSizing: "border-box",
                  //   MozBoxSizing: "border-box",
                  //   WebkitBoxSizing: "border-box",
                  //   padding: "10px",
                  //   // width: "100%",
                  //   width: mainWidth,
                  //   marginLeft: mainOffset,
                  //   transition: "margin-left 0.5s"
                  // }}
                  >
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/urilist/:id" element={<URIList />} />
                      <Route path="/uri" element={<URI />} />
                      <Route path="/uri/:id" element={<Dashboard />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route
                        path="/development/:id"
                        element={<Development />}
                      />
                      <Route path="/workspaces" element={<Workspace />} />
                    </Routes>
                  </main>
                </div>
              </div>
            {/* </Router> */}
          </Box>
        </Box>

        </Router>

      </ThemeProvider>
    </ColorModeContext.Provider>
  );

  // // const [simulation, setSimulation] = useState(false);
  // // const [monitoring, setMonitoring] = useState(false);
  // const [theme, colorMode] = useMode();
  // const [mainWidth, setMainWidth] = useState("100vw");
  // const [mainOffset, setMainOffset] = useState("0px");

  // return (
  //   <ColorModeContext.Provider value={colorMode}>
  //     <ThemeProvider theme={theme}>
  //       <CssBaseline />
  // <Router>
  //   <div className="fullApp">
  //     <NavBar setMainWidth={setMainWidth} setMainOffset={setMainOffset} />
  //     {/* <Sidebar /> */}
  //     <div className="content">
  //       <main
  //         style={{
  //           boxSizing: "border-box",
  //           MozBoxSizing: "border-box",
  //           WebkitBoxSizing: "border-box",
  //           padding: "10px",
  //           // width: "100%",
  //           width: mainWidth,
  //           marginLeft: mainOffset,
  //           transition: "margin-left 0.5s"
  //         }}
  //       >
  //         <Topbar />
  //         {/* <Header
  //         setSimulation={setSimulation}
  //         setMonitoring={setMonitoring}
  //       /> */}
  //         <Routes>
  //           <Route path="/" element={<Home />} />
  //           <Route path="/urilist/:id" element={<URIList />} />
  //           <Route path="/uri" element={<URI />} />
  //           <Route path="/uri/:id" element={<Dashboard />} />
  //           <Route path="/settings" element={<Settings />} />
  //           <Route path="/development/:id" element={<Development />} />
  //           <Route path="/workspaces" element={<Workspace />} />
  //         </Routes>
  //       </main>
  //     </div>
  //   </div>
  // </Router>
  //     </ThemeProvider>
  //   </ColorModeContext.Provider>
  // );
};

export default App;
