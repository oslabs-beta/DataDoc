import React, { useEffect } from "react";


const Development=(props)=>{
  const {setSimulation} = props
  useEffect(()=>{
    setSimulation(true)
  }, [])
  return(
    <div className='developmentContainer'>
      <h1>HELLO WORLD</h1>
    </div>
  )
}

export default Development;