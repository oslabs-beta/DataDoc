import React, { useEffect, useState } from "react";
import LineChart from "../components/LineChart.jsx";
import DonutChart from "../components/DonutChart.jsx";
import Histogram from "../components/Histogram.jsx";
import "../styles/Charts.scss";
import { useParams, useLocation } from "react-router-dom";
import Test from "../components/test.jsx";

const ChartsContainer = (props) => {
  const {id} = useParams()
  const location = useLocation()
  const {method} = location.state
  const {path} = location.state
  const {setMonitoring, setSimulation} = props
  const [respTimeLineData, setRespTimeLineData] = useState({})
  const [reqFreqLineData, setReqFreqLineData] = useState({})
  const [respTimeHistData, setRespTimeHistData] = useState({})
  const [statusPieData, setStatusPieData] = useState({})

  // console.log('ID: ', id)
  console.log('METHOD: ', method)
  console.log('PATH: ', path)

  useEffect(()=>{
    setMonitoring(true)
    setSimulation(false)
  })

  //fetch request for the chart data
  useEffect(()=>{
    // fetch(`${SERVER_URL}/chartdata/${method}/${path}`)
    fetch(`${SERVER_URL}/chartdata//slow/GET`).then((response)=>response.json()).then((dataObj)=>{
      setRespTimeLineData(dataObj.respTimeLineData)
      setReqFreqLineData(dataObj.reqFreqLineData)
      setRespTimeHistData(dataObj.respTimeHistData)
      setStatusPieData(dataObj.statusPieData)
    }).catch((err)=>{
      console.log(`there was an error in the charts container fetch request, error: ${err}`)
    })
  }, [])
  

  return (
    <>
      <h1>Charts Container</h1>
      <h3>Path: {path}</h3>
      <h3>Method: {method}</h3>
      <div className="charts-container">
        <LineChart id={id} respTimeLineData={respTimeLineData} reqFreqLineData={reqFreqLineData}/>
        <Histogram id={id} respTimeHistData={respTimeHistData}/>
        <LineChart id={id} respTimeLineData={respTimeLineData} reqFreqLineData={reqFreqLineData}/>
        <DonutChart id={id} statusPieData={statusPieData}/>
      </div>
    </>
  );
};

export default ChartsContainer;
