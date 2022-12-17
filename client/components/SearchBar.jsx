import React, {useState,useEffect} from "react";

const SearchBar=()=>{

  return(
    <div>
      <form action="/" method="get">
        <input type="text" id="header-search" placeholder="Search blog posts"/>
        <button type="submit">Search</button>
      </form>
    </div>
  )
}

export default SearchBar;