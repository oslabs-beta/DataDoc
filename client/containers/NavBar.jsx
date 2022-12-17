import React, { useState, useEffect } from "react";
import "../styles/NavBar.scss";
import HomeButton from "../components/HomeButton.jsx";
import Settings from "../components/Settings.jsx";

const NavBar = () => {
  const width = 300;
  const height = "100vh";
  const [xPosition, setX] = useState(-width);
  // const [open, setOpen] = useState('')
  // const hide = () => setOpen('translateX(100%)')
  // const show = () => setOpen("translateX(0)")

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
        <HomeButton />
        <Settings />
      </div>
    </React.Fragment>
  );
};

export default NavBar;
