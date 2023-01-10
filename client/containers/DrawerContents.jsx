import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import { Menu } from "@mui/icons-material";

const DrawerContents = (props) => {
  const { open } = props;
  const [workspaceList, setWorkspaceList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getWorkSpaceList();
    return;
  }, []);

  const getWorkSpaceList = async () => {
    const newWorkspaceList = await (
      await fetch(`http://localhost:${process.env.PORT}/workspaces`)
    ).json();
    setWorkspaceList(newWorkspaceList);
    return;
  };

  return (
    <List>
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
              {/* <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center"
                }}
              >
                <Menu />
              </ListItemIcon> */}
              <Avatar
                // size="small"
                edge="start"
                sx={{
                  minWidth: 0,
                  width: "40px",
                  height: "40px",
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {workspace.name.slice(0, 2)}
              </Avatar>
              <ListItemText
                edge="start"
                primary={workspace.name}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default DrawerContents;
