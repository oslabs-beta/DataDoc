import React from "react";
import { MemoryRouter as Router } from 'react-router-dom';

// import Production from '../containers/Production'

const HomeButton=(props)=>{
  return(
    <button>
      <Link to='/'>Home</Link>
    </button>
  )
}

export default HomeButton