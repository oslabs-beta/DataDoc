import React, { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "./theme"; 
import './SidebarStyles.scss'

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar style={{height: '100vh'}}>
        <Menu>
          <MenuItem>
            WorkSapce1
            <SubMenu>
              /path
            </SubMenu>
          </MenuItem>
          <MenuItem>
            WorkSapce2
            <SubMenu>
              /path
            </SubMenu>
          </MenuItem>
        </Menu>
      </ProSidebar>
    </Box>
  )
}

export default Sidebar;