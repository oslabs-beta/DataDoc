import React, { useState, useEffect } from "react";
import { Input, TextField } from "@mui/material"
import { Search } from "@mui/icons-material"

const SearchBar = (props) => {
  
  // const [searchInput, setSearch] = useState('');

  const inputHandler = (e) => {
    // * convert input text to lower case
    // console.log("input handler TRIGGERED", e)
    var lowerCase = e.target.value.toLowerCase();
    props.setSearch(lowerCase);
  };

  return (
    <>
      <form action="/" method="get">
        <Input
          type="text"
          id="header-search"
          placeholder="Search for a specific endpoint"
          onChange={inputHandler}
          endAdornment={<Search />}
          disableUnderline={true}
          sx={{
            width: 240,
            px: 2,
            px: 1,
            mt: 2,
            border: "1px solid black",
            borderRadius: 2
          }}
          // searchInput={props.searchInput}
        />
        {/* <button type="submit">Search</button> */}
      </form>
    </>
  );
};

export default SearchBar;
