import React, { useEffect, useState } from "react";
import '../styles/Header.scss'

//header to create links that will be used to navigate between routes
const Header = (props) => {
  const {monitoring, simulation } = props
  return(
  <header>
    <nav>
      <div>
        <span>
            <button className='header-button' style={
              monitoring ? {backgroundColor: 'lightgray'} : {backgroundColor: 'white'}
            }>MONITORING</button>
            <button className='header-button' style={
              simulation ? {backgroundColor: 'lightgray'} : {backgroundColor: 'white'}
            }>SIMULATION</button>
        </span>
      </div>
    </nav>
  </header>
  )
}

export default Header