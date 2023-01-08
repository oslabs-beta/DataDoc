import React, { useState, useEffect } from "react";
import "../styles/NavBar.scss";
import HomeButton from "../components/HomeButton.jsx";
import { Link } from "react-router-dom";
import Draggable from "react-draggable";

const NavBar = () => {
  const [workspaceList, setWorkspaceList] = useState([]);

  const width = 300;
  const height = "100vh";
  const [xPosition, setX] = useState(-width);

  const toggleMenu = () => {
    if (xPosition < 0) {
      getWorkSpaceList();
      setX(0);
    } else {
      setX(-width);
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
          minHeight: height
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
        <Link
          to="/"
          onClick={toggleMenu}
          // state={{ toggleMenu: toggleMenu }}
        >
          <button>Home</button>
        </Link>
        {/* <Link to="/urilist" onClick={toggleMenu}>
        URI List
      </Link> */}
        <div>
          {workspaceList.map((workspace) => {
            const workspace_id = workspace._id;
            const name = workspace.name;
            const domain = workspace.domain;
            return (
              <div
                key={crypto.randomUUID()}
              >
                <Link
                  to={`/urilist/${workspace_id}`}
                  state={{ workspace_id: workspace_id, name: name, domain: domain }}
                  onClick={toggleMenu}
                >
                  {name}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default NavBar;
