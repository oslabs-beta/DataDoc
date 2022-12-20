import React from "react";

//import components here
import URIList from '../components/URIList.jsx'
import ChartsContainer from "./ChartsContainer.jsx";
import NavBar from "./NavBar.jsx";

const Production = () => {
  return (
    <div className='productionContainer'>
      {/* <h1>This is from production</h1> */}
      <URIList />
      {/* <Charts/> */}
      {/* <ChartsContainer /> */}
    </div>
  )
}

export default Production;