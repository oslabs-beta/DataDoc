import React, { useEffect, useState } from "react";

//header to create links that will be used to navigate between routes
const Header = (props) => {
  const {monitoring, simulation } = props
  return(
  <header>
    <nav>
      <div>
        <span>
          <div>
            <button style={
              monitoring ? {backgroundColor: 'lightgray'} : {backgroundColor: 'white'}
            }>MONITORING</button>
          </div>
          <div>
            <button style={
              simulation ? {backgroundColor: 'lightgray'} : {backgroundColor: 'white'}
            }>SIMULATION</button>
          </div>
        </span>
      </div>
    </nav>
  </header>
  )
}

export default Header