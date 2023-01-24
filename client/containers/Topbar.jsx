import React, { useState, useEffect, useContext } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Settings as SettingsIcon,
  SettingsOutlined,
  NotificationsOutlined,
  Help
} from "@mui/icons-material";
import { ColorModeContext, tokens } from "../theme.js";
import { Back, Forward } from "../components/NavButtons.jsx";
import Settings from "../components/Settings.jsx";

// ! Delete when done
import { useNavigate } from "react-router-dom";

const TopBar = (props) => {

  const { showSettingsPopup, setShowSettingsPopup } = props;

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
      <Box width="100%" ml="-4px" sx={{
        alignItems: "center",
        display: "flex",
      }}>
        <Box
          sx={{
            marginRight: "auto",
          }}
        >
          <Back sx={{
          }}/>
          <Forward />
        </Box>
        <Box
          sx={{
            display: "flex",
            marginLeft: "auto"
          }}
        >
          <IconButton
            onClick={() => {
              if (showSettingsPopup) setShowSettingsPopup(false);
              else setShowSettingsPopup(true);
            }}
          >
            <SettingsIcon />
            <Settings />
          </IconButton>
          <IconButton
            onClick={() => (window.open(`https://github.com/oslabs-beta/DataDoc/blob/dev/README.md#readme`))}
          >
            <Help />
          </IconButton>
          <IconButton
            onClick={colorMode.toggleColorMode}
          >
            {theme.palette.mode === "light" ? (
              <DarkModeOutlined />
            ) : (
              <LightModeOutlined />
            )}
          </IconButton>
        </Box>
      </Box>
    </nav>
  );
};

export default TopBar;
