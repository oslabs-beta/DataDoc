import React from "react";
import { MemoryRouter as Router } from 'react-router-dom';

// import Production from '../containers/Production'

const HomeButton=(props)=>{
  return(
    <Router>
      <div className="homeButton">
        <Link to='/'>Home</Link>
      </div>
    </Router>
    // <button>home</button>
  )
}

export default HomeButton