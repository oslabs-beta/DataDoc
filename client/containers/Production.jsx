import React from "react";

//import components here
import URIList from '../components/URIList.jsx'
import Charts from '../components/Charts.jsx';
import Dashboard from '../components/Dashboard.jsx';

const Production = () => {
  return (
    <div className='productionContainer'>
      <h1>This is from production</h1>
      {/* <URIList /> */}
      {/* <Charts/> */}
      <Dashboard />
    </div>
  )
}

export default Production;