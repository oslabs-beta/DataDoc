import React from 'react';
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from '@mui/icons-material';

export const Back = () => {
  let navigate = useNavigate();
  return (
    <IconButton onClick={() => navigate(-1)}>
      <ArrowBack />
    </IconButton>
  );
};

export const Forward = () => {
  let navigate = useNavigate();
  return (
    <IconButton onClick={() => navigate(+1)}>
      <ArrowForward />
    </IconButton>
  );
};
