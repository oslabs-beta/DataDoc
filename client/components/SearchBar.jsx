import React, {useState,useEffect} from "react";

const SearchBar=(props)=>{

  // const [searchInput, setSearch] = useState('');

  const inputHandler = (e) => {
    //convert input text to lower case
    console.log("input handler TRIGGERED", e)
    var lowerCase = e.target.value.toLowerCase();
    props.setSearch(lowerCase);
  };

  return(
    <div>
      <form action="/" method="get">
        <input type="text" id="header-search" placeholder="Search URI" onChange={inputHandler} searchInput = {props.searchInput}/>
        {/* <button type="submit">Search</button> */}
      </form>
    </div>
  )
}

export default SearchBar;