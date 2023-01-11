import React, { useState, useEffect, useContext } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import {
  LightModeOutlined,
  DarkModeOutlined,
  SettingsOutlined,
  NotificationsOutlined
} from "@mui/icons-material";
import { ColorModeContext, tokens } from "./theme";
import { Back, Forward } from "../components/NavButtons.jsx";

// ! Delete when done
import { useNavigate } from "react-router-dom";

const TopBar = () => {

  // !
  const navigate = useNavigate();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  return (
    <nav
      style={{
        boxSizing: "border-box",
        MozBoxSizing: "border-box",
        WebkitBoxSizing: "border-box",
        width: "100%"
      }}
    >
      <Box display="flex" width="100%" ml="-8px">
        <Back />
        <Forward />
        <Box>
          <h1
            onClick={() => {
              navigate("/workspace/23", { state: { workspace_id: 23 } })
            }}
          >
            Workspace5
          </h1>
        </Box>
        <IconButton
          onClick={colorMode.toggleColorMode}
          sx={{
            marginLeft: "auto"
          }}
        >
          {theme.palette.mode === "light" ? (
            <DarkModeOutlined />
          ) : (
            <LightModeOutlined />
          )}
        </IconButton>
      </Box>
    </nav>
  );
};

export default TopBar;
