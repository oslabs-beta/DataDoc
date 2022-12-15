import React, { useEffect, useState } from 'react';
//generates unique keys
import { v4 as uuidv4 } from 'uuid';
import testData from './dummydata'

//import other components here
import URI from './URI.jsx'
import FlashError from './FlashError.jsx';

const test = [
  { endpoint: "route1", status: 200 },
  { endpoint: "route2", status: 200 },
  { endpoint: "route3", status: 200 },
  { endpoint: "route4", status: 200 }
]

const URIList=(props)=>{
  const [URIList, setURIList] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  //fetch the URI List from the backend when the component mounts
  useEffect(()=> {
    fetch('http://localhost:9990/routes')
     .then(response=>response.json())
     .then(data=>{
      setURIList(()=> data)
      }).catch((err)=>{
        console.log(err)
        // setErrorMessage('Invalid fetch request for sthe URI List.')
        // reset the error message
        // setTimeout(()=> setErrorMessage(''), 3000)
      })
      // setURIList(test.map((element)=>{
      //   return <URI key={uuidv4()} endpoint={element.endpoint} status={element.status}/>
      // }))
      // console.log(URIList)
  },[])
  return(
    <div className='URIListContainer'>
      <div className='URIEntries'>
        {/* {errorMessage !== '' ? <FlashError errorMessage={errorMessage}/> : null} */}
        {URIList.map((element)=>{
          return <URI key={uuidv4()} endpoint={element.endpoint} status={element.status}/>
        })}
      </div>
    </div>
  )
}

export default URIList