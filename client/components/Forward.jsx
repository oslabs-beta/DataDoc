import React from 'react';
import { useNavigate } from "react-router-dom";

const Forward = () => {
  let navigate = useNavigate();
  return (
    <>
      <button onClick={() => navigate(+1)}>Forward</button>
    </>
  );
};

export default Forward;
