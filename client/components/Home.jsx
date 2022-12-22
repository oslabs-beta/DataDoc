import React, { useEffect } from 'react'

const Home = (props) => {
  const {setSimulation, setMonitoring} = props
  useEffect(()=>{
    setSimulation(false)
    setMonitoring(false)
  })

  return(
  <div>
    <h1>Welcome to Datatective</h1>
  </div>
  )
  }

export default Home
