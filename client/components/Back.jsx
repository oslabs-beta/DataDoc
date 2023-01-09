import React from 'react';
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from "@mui/material"

const Back = () => {
  let navigate = useNavigate();
  return (
    <IconButton onClick={() => navigate(-1)} >
      <ArrowBackIcon />
    </IconButton>
  );
};

export default Back;
