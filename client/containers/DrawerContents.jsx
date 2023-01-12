import { Home, Settings as SettingsIcon } from "@mui/icons-material";
import {
  Avatar,
  Divider, List,
  ListItem,
  ListItemButton, ListItemText
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Settings from "../components/Settings.jsx";

const DrawerContents = (props) => {
  const {
    open,
    showsettingspopup: showSettingsPopup,
    setshowsettingspopup: setShowSettingsPopup
  } = props;
  const [workspaceList, setWorkspaceList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getWorkSpaceList();
    return;
  }, [open]);

  const getWorkSpaceList = async () => {
    const newWorkspaceList = await (
      await fetch(`http://localhost:${process.env.PORT}/workspaces`)
    ).json() || [];
    setWorkspaceList(newWorkspaceList);
    return;
  };

  return (
    <List>
      <ListItem disablePadding sx={{ display: "block", ml: -0.5 }}>
        <ListItemButton onClick={() => navigate("/")}>
          <Avatar
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              my: 0.5,
              justifyContent: "center"
            }}
          >
            <Home />
          </Avatar>
          <ListItemText
            edge="end"
            primary="Home"
            sx={{ opacity: open ? 1 : 0, fontWeight: "600" }}
          />
        </ListItemButton>
      </ListItem>
      <Divider />
      {workspaceList.map((workspace) => {
        return (
          <ListItem
            key={crypto.randomUUID()}
            disablePadding
            sx={{ display: "block" }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5
              }}
              onClick={() => {
                navigate(`/workspace/${workspace._id}`, {
                  state: {
                    workspaceId: workspace._id,
                    name: workspace.name,
                    domain: workspace.domain,
                    port: workspace.port,
                    metricsPort: workspace.metrics_port
                  }
                });
              }}
            >
              <Avatar
                edge="end"
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  my: 0.5,
                  justifyContent: "center"
                }}
              >
                {workspace.name
                  .split(" ")
                  .slice(0, 2)
                  .map((word) => word[0])
                  .join("")
                  .toUpperCase()}
              </Avatar>
              <ListItemText
                edge="end"
                primary={workspace.name}
                secondary={workspace.domain}
                sx={{ opacity: open ? 1 : 0, fontWeight: "600" }}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
      <ListItem disablePadding sx={{ display: "block", ml: -0.5 }}>
        <ListItemButton
          onClick={() => {
            if (showSettingsPopup) setShowSettingsPopup(false);
            else setShowSettingsPopup(true);
          }}
        >
          <Avatar
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              my: 0.5,
              justifyContent: "center"
            }}
          >
            <SettingsIcon />
            <Settings />
          </Avatar>
          <ListItemText
            edge="end"
            primary="Settings"
            sx={{ opacity: open ? 1 : 0, fontWeight: "600" }}
          />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default DrawerContents;
