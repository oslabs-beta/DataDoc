import React from 'react';
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { IconButton } from "@mui/material"

const Forward = () => {
  let navigate = useNavigate();
  return (
    <IconButton onClick={() => navigate(+1)}>
      <ArrowForwardIcon  />
    </IconButton>
  );
};

export default Forward;
