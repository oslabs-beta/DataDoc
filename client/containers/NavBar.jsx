// import React, { useState, useEffect } from "react";
// import "../styles/NavBar.scss";
// import HomeButton from "../components/HomeButton.jsx";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import Draggable from "react-draggable";
// import { useTheme } from "@mui/material";
// import { tokens } from "./theme";

// const NavBar = (props) => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const { setMainWidth, setMainOffset } = props;
//   const [workspaceList, setWorkspaceList] = useState([]);

//   const navigate = useNavigate();

//   const width = 300;
//   const height = "100vh";
//   const [xPosition, setX] = useState(-width);

//   const toggleMenu = () => {
//     if (xPosition < 0) {
//       getWorkSpaceList();
//       setX(0);
//       setMainWidth(`calc(100vw - ${width}px)`)
//       setMainOffset(`${width}px`)
//     } else {
//       setX(-width);
//       setMainWidth("100vw")
//       setMainOffset(`0px`)
//     }
//   };

//   useEffect(() => {
//     setX(-width);
//   }, []);

//   useEffect(() => {
//     getWorkSpaceList();
//   }, []);

//   const getWorkSpaceList = () => {
//     fetch(`http://localhost:${process.env.PORT}/workspaces`)
//       .then((response) => response.json())
//       .then((data) => {
//         setWorkspaceList(data);
//       })
//       .catch((err) => {
//         console.log(`there was an error: ${err}`);
//       });
//   };

//   return (
//     <React.Fragment>
//       <div
//         className="navbar-container"
//         style={{
//           transform: `translatex(${xPosition}px)`,
//           width: width,
//           minHeight: height,
//           backgroundColor: `${colors.primary[400]}`,
//         }}
//       >
//         <Draggable axis="y">
//           <div>
//             <button
//               className="navbar-button"
//               onClick={() => toggleMenu()}
//               style={{
//                 transform: `translate(${width}px, 20vh)`
//               }}
//             ></button>
//           </div>
//         </Draggable>
//         <button
//           onClick={() => {
//             navigate("/");
//             toggleMenu();
//           }}
//         >
//           Home
//         </button>
//         <div>
//           {workspaceList.map((workspace) => {
//             const workspace_id = workspace._id;
//             const name = workspace.name;
//             const domain = workspace.domain;
//             return (
//               <div key={crypto.randomUUID()}>
//                 <div
//                   style={{
//                     cursor: "pointer"
//                   }}
//                   onClick={() => {
//                     navigate(`/urilist/${workspace_id}`, {
//                       state: { workspace_id, name, domain }
//                     });
//                     toggleMenu();
//                   }}
//                 >
//                   {name}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </React.Fragment>
//   );
// };

// export default NavBar;

import React from "react";
import "../styles/NavBar.scss";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ChevronLeft, Menu } from "@mui/icons-material";
import {
  Divider,
  Drawer as MuiDrawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTheme } from '@mui/material/styles'
import { useMode } from '../containers/theme.js'

const SideBar = (props) => {
  const {open,  handledrawerclose: handleDrawerClose } = props;
  // const theme = useTheme();
  const [theme] = useMode();

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
  const DrawerSection = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar
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

  return (
    // <ThemeProvider theme={theme}>
    <Drawer variant="permanent" open={open}>
      <DrawerSection>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeft />
        </IconButton>
      </DrawerSection>
      <Divider />
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
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
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
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
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
    // </ThemeProvider>

  );
};

export default SideBar;
