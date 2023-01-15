import React, { useState, useEffect, useContext } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import {
  LightModeOutlined,
  DarkModeOutlined,
  SettingsOutlined,
  NotificationsOutlined,
  Help
} from "@mui/icons-material";
import { ColorModeContext, tokens } from "../theme.js";
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
          <IconButton>
            <Help />
          </IconButton>
          <IconButton
            onClick={colorMode.toggleColorMode}
            ml="auto"
            sx={{
              // marginLeft: "auto"
            }}
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
