import React, { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent, SidebarFooter } from "react-pro-sidebar";
import './SidebarStyles.scss'

const Sidebar = () => {

  return (
    <div>
      <ProSidebar>
        <Menu>
          <MenuItem>
            WorkSapce1
          </MenuItem>
        </Menu>
      </ProSidebar>
    </div>
  )
}

export default Sidebar;