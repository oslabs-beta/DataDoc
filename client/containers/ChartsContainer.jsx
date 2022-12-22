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

  const { SERVER_URL } = process.env;
  console.log('SERVER URL: ', SERVER_URL)

  // console.log('ID: ', id)
  console.log('METHOD: ', method)
  console.log('PATH: ', path)

  useEffect(()=>{
    setMonitoring(true)
    setSimulation(false)
  })

  //fetch request for the chart data
  useEffect(()=>{
    fetch(`${SERVER_URL}/chartdata/linechart/2`)
    // fetch(`${SERVER_URL}/chartdata/${method}/${path}`)
    // fetch(`${SERVER_URL}/chartdata//slow/GET`)
    .then((response)=>response.json())
    .then((dataObj)=>{
      console.log('in the fetch request in chartsContainer: ', dataObj)
      setRespTimeLineData(dataObj.respTimeLineData)
      setRespTimeLineData((respTimeLineData)=>{
        return respTimeLineData
      })
      console.log('resp time line data: ', respTimeLineData)
      setReqFreqLineData(dataObj.reqFreqLineData)
      setReqFreqLineData((reqFreqLineData)=>{
        return reqFreqLineData
      })
      console.log('req freq line data: ', reqFreqLineData)
      setRespTimeHistData(dataObj.respTimeHistData)
      setRespTimeHistData((respTimeHistData)=>{
        return respTimeHistData
      })
      console.log('resp time hist data: ', respTimeHistData)
      setStatusPieData(dataObj.statusPieData)
      setStatusPieData((statusPieData)=>{
        return statusPieData
      })
      console.log('status code hist data: ', statusPieData)
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
        <LineChart id={id} chartData={respTimeLineData} />
        <Histogram id={id} chartData={respTimeHistData}/>
        <LineChart id={id} chartData={reqFreqLineData}/>
        <DonutChart id={id} chartData={statusPieData}/>
      </div>
    </>
  );
};

export default ChartsContainer;
