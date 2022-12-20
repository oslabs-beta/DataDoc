import React from "react";
import {Link} from "react-router-dom"

//header to create links that will be used to navigate between routes
const Header = () => {
  return(
  <header>
    <nav>
      <div>
        <Link to='/'><h5>Home</h5></Link>
        <Link to='/urilist'>Dashboard</Link>
        <Link to='/settings'>Settings</Link>
      </div>
    </nav>
  </header>
  )
}

export default Header