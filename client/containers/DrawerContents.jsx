import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Divider,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from "@mui/material";
import { Menu, Home } from "@mui/icons-material";

const DrawerContents = (props) => {
  const { open } = props;
  const [workspaceList, setWorkspaceList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getWorkSpaceList();
    return;
  }, [open]);

  const getWorkSpaceList = async () => {
    const newWorkspaceList = await (
      await fetch(`http://localhost:${process.env.PORT}/workspaces`)
    ).json();
    setWorkspaceList(newWorkspaceList);
    return;
  };

  return (
    <List>
      <ListItem disablePadding sx={{ display: "block" }}>
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
                navigate(`urilist/${workspace._id}`, {
                  state: {
                    workspace_id: workspace._id,
                    name: workspace.name,
                    domain: workspace.domain
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
              {/* <Typography variant="h4" sx={{ opacity: open ? 1 : 0, display: open ? "block" : "none", fontWeight: "600" }}>
                {workspace.name}
              </Typography> */}
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default DrawerContents;
