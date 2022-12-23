import React, { useState, useEffect } from "react";
import { Box, Slider,Typography, Button } from '@mui/material';


const Development=(props)=>{
  const {setSimulation} = props
  const [settings, setSettings] = useState({
    RPS: 0,
    timeInterval: 0
  })
  
  useEffect(()=>{
    setSimulation(true)
  }, [])

  function valuetext(value) {
		return `${value}`;
	}

  function handleChange(e, updatedVal) {

    const updatedInputVal = { [updatedVal] : e.target.value }
    const updatedState = {
        ...settings,
        ...updatedInputVal,
  };
    setSettings(updatedState);
  }


  function handleTesting(e) {
    e.preventDefault();
    fetch(`http://localhost:${process.env.PORT}/simulation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(settings)
    }).then((res) => res.json())
    .then((data)=>{
      console.log('THIS IS FROM THE RESPONSE', data)
    })
    .catch((err)=>{
      console.log(`there was an error sending the simulation METRICS, error: ${err}`)
    })
  }


  return(
    <div className='developmentContainer'>
      <Box display="flex" flexDirection="column" m={10}>
      <Typography id="hdr" variant="h3" gutterBottom>
       Simulate User Activity
      </Typography>
      <Typography id="discrete-slider" gutterBottom>
        Requests Per Second: 
      </Typography>
      <Slider
        aria-label="Temperature"
        defaultValue={30}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        step={100}
        // style={{ width: 500, marginLeft: 300, marginTop: 100}}
        marks
        min={10}
        max={1000}
        value = {settings.RPS}
        onChange={(e) => handleChange(e, 'RPS')}
          />
        <Typography id="discrete-slider" gutterBottom>
          Time Interval: 
        </Typography>
        <Slider
        aria-label="Temperature"
        defaultValue={30}
        getAriaValueText={valuetext}
        // style={{ width: 500, marginLeft: 300}}
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={20}
        value = {settings.timeInterval}
        onChange={(e) => handleChange(e, 'timeInterval')}
        />

      <Button variant="contained" onClick={handleTesting}>START TESTING</Button>
      <br />
      <Button variant="outlined" color ="secondary">STOP</Button>
      </Box>
      </div>
  )
}

export default Development;