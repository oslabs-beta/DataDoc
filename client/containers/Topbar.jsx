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

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  return (
    <nav
      style={{
        width: "100vw",
        boxSizing: "border-box",
        MozBoxSizing: "border-box",
        WebkitBoxSizing: "border-box"
      }}
    >
      <Box display="flex" width="100%" padding="0px 10px 0px 4px">
        <Back />
        <Forward />
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

export default Topbar;
