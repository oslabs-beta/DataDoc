import React, { useState, useEffect, useContext } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { LightModeOutlined, DarkModeOutlined, SettingsOutlined, NotificationsOutlined } from "@mui/icons-material";
import { ColorModeContext, tokens } from "./theme";
import { Back, Forward } from "../components/NavButtons.jsx";


const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  return (
    <Box 
        display="flex" 
        width="100vw"
        padding="0px 10px 0px 2px" 
    >
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
  );
};

export default Topbar;
