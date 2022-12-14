import React, { useEffect, useState } from 'react';
//generates unique keys
import { v4 as uuidv4 } from 'uuid';
import testData from './dummydata'

//import other components here
import URI from './URI.jsx'
import FlashError from './FlashError.jsx';



// const test = data


const URIList=(props)=>{
  const [URI, setURI] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  //fetch the URI List from the backend when the component mounts
  useEffect(()=> {
    //endpoint with the list of each URI in the underlying codebase
    // fetch('./dummydata.js', {
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    //  .then(response=>response.json())
    //  .then(uriList=>{
    //   console.log('URI List: ', uriList)
    //     setURI(getURIs(uriList).sort())
    //   }).catch((err)=>{
    //     setErrorMessage('Invalid fetch request for sthe URI List.')
    //     //reset the error message
    //     // setTimeout(()=> setErrorMessage(''), 3000)
    //   })
    setURI(testData)
  })
  //iterate through the array list and create an individual URI component for each
    const getURIs = (list) =>{
      return list.map((URI)=>{
        //consider what additional information we need to pass down for each component / how to access it
        <URI key={uuidv4()} id={URI.id} />
      })
    }
  
  return(
    <div className='URIListContainer'>
      <div className='URIEntries'>
        {errorMessage !== '' ? <FlashError errorMessage={errorMessage}/> : null}
        {URI}
      </div>
    </div>
  )
}

export default URIList