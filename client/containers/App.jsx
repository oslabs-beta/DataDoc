import React from "react";

import NavBar from "./NavBar.jsx";
import Development from "./Development.jsx";
import Production from "./Production.jsx";

import "../styles/globals.scss";

function App() {
  return (
    <div>
      <NavBar/>
      <Development />
      <Production />
    </div>
  );
}

export default App;
