import React, { useState, useEffect } from "react";
import "../styles/NavBar.scss";
import HomeButton from "../components/HomeButton.jsx";
import Settings from "../components/Settings.jsx";
import { Link } from "react-router-dom";

const NavBar = () => {
  const width = 300;
  const height = "100vh";
  const [xPosition, setX] = useState(-width);

  const toggleMenu = () => {
    if (xPosition < 0) {
      setX(0);
    } else {
      setX(-width);
    }
  };

  useEffect(() => {
    setX(-width);
  }, []);

  return (
    <React.Fragment>
      <div
        className="navbar-container"
        style={{
          transform: `translatex(${xPosition}px)`,
          width: width,
          minHeight: height,
        }}
      >
        <button
          className="navbar-button"
          onClick={() => toggleMenu()}
          style={{
            transform: `translate(${width}px, 20vh)`,
          }}
        ></button>
        <Link to='/' onClick={toggleMenu}><button>Home</button></Link>
        <Link to='/urilist'onClick={toggleMenu}>Dashboard</Link>
        <Settings/>
      </div>
    </React.Fragment>
  );
};

export default NavBar;
