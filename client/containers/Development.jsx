import React, { useState, useEffect } from "react";
import { Box, Slider } from '@mui/material';


const Development=(props)=>{
  const {setSimulation} = props
  const [RPM, setRPM] = useState(0)
  const [timeInterval, setTimeInterval] = useState(0)
  
  useEffect(()=>{
    setSimulation(true)
  }, [])

  function valuetext(value) {
		return `${value}`;
	}

  const updateRPM = (e, data) => {
    setRPM(data);
  };

  const updateInterval = (e, data) => {
    setTimeInterval(data);
  };

  console.log("THIS IS RPM", RPM)
  console.log("THIS IS INTERVAL", timeInterval)

  return(
    <div className='developmentContainer'>
      <h1>HELLO WORLD</h1>
      <Box display="flex" flexDirection="column" m={10}>
      <Slider
        aria-label="Temperature"
        defaultValue={30}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        step={100}
        style={{ width: 500, marginLeft: 300, marginTop: 100}}
        marks
        min={10}
        max={1000}
        value = {RPM}
        onChange ={updateRPM}
          />
  
        <Slider
        aria-label="Temperature"
        defaultValue={30}
        getAriaValueText={valuetext}
        style={{ width: 500, marginLeft: 300}}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={20}
        value = {timeInterval}
        onChange ={updateInterval}
          />
      </Box>
      </div>
  )
}

export default Development;