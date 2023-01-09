import React, { useState, useEffect } from "react";
import "../styles/NavBar.scss";
import HomeButton from "../components/HomeButton.jsx";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Draggable from "react-draggable";
import { useTheme } from "@mui/material";
import { tokens } from "./theme";

const NavBar = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { setMainWidth, setMainOffset } = props;
  const [workspaceList, setWorkspaceList] = useState([]);

  const navigate = useNavigate();

  const width = 300;
  const height = "100vh";
  const [xPosition, setX] = useState(-width);

  const toggleMenu = () => {
    if (xPosition < 0) {
      getWorkSpaceList();
      setX(0);
      setMainWidth(`calc(100vw - ${width}px)`)
      setMainOffset(`${width}px`)
    } else {
      setX(-width);
      setMainWidth("100vw")
      setMainOffset(`0px`)
    }
  };

  useEffect(() => {
    setX(-width);
  }, []);

  useEffect(() => {
    getWorkSpaceList();
  }, []);

  const getWorkSpaceList = () => {
    fetch(`http://localhost:${process.env.PORT}/workspaces`)
      .then((response) => response.json())
      .then((data) => {
        setWorkspaceList(data);
      })
      .catch((err) => {
        console.log(`there was an error: ${err}`);
      });
  };

  return (
    <React.Fragment>
      <div
        className="navbar-container"
        style={{
          transform: `translatex(${xPosition}px)`,
          width: width,
          minHeight: height,
          backgroundColor: `${colors.primary[400]}`,
        }}
      >
        <Draggable axis="y">
          <div>
            <button
              className="navbar-button"
              onClick={() => toggleMenu()}
              style={{
                transform: `translate(${width}px, 20vh)`
              }}
            ></button>
          </div>
        </Draggable>
        <button
          onClick={() => {
            navigate("/");
            toggleMenu();
          }}
        >
          Home
        </button>
        <div>
          {workspaceList.map((workspace) => {
            const workspace_id = workspace._id;
            const name = workspace.name;
            const domain = workspace.domain;
            return (
              <div key={crypto.randomUUID()}>
                <div
                  style={{
                    cursor: "pointer"
                  }}
                  onClick={() => {
                    navigate(`/urilist/${workspace_id}`, {
                      state: { workspace_id, name, domain }
                    });
                    toggleMenu();
                  }}
                >
                  {name}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default NavBar;
