import React, { useState, useEffect } from "react";
import { Input, TextField } from "@mui/material"
import { Search } from "@mui/icons-material"

const SearchBar = (props) => {
  
  const { handleSearchChange } = props;

  return (
    <>
      <form action="/" method="get">
        <Input
          type="text"
          id="header-search"
          onChange={handleSearchChange}
          placeholder="Search for a specific endpoint"
          color="neutral"
          endAdornment={<Search color="neutral" />}
          disableUnderline={true}
          sx={{
            width: 300,
            px: 1,
            border: "0.5px solid",
            borderRadius: 2
          }}
        />
      </form>
    </>
  );
};

export default SearchBar;
