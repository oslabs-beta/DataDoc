import React from 'react';
import { useNavigate } from "react-router-dom";

const Back = () => {
  let navigate = useNavigate();
  return (
    <>
      <button onClick={() => navigate(-1)}>Back</button>
    </>
  );
};

export default Back;
