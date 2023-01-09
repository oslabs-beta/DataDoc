import React from "react";
import { MemoryRouter as Router } from "react-router-dom";

// import Production from '../containers/Production'

const HomeButton = (props) => {

  const { onClick } = props;

  return (
    <button>
      <Link to="/" onClick={() => {onClick; console.log("Click")}}>
        Home
      </Link>
    </button>
  );
};

export default HomeButton;
