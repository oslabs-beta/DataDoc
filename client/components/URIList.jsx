import React, { useEffect, useState } from "react";
// * generates unique keys
import { v4 as uuidv4 } from "uuid";
import {Link} from 'react-router-dom'


// * import other components here
import URI from './URI.jsx'
import FlashError from './FlashError.jsx';
import SearchBar from './SearchBar.jsx';
// import { E } from "chart.js/dist/chunks/helpers.core.js";
// import e from "express";

function URIList(props){
  const [URIList, setURIList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchInput, setSearch] = useState('');
  const [trackingURI, setTrackingURI] = useState([])

  // setTrackingURI=this.bind(setTrackingURI)

  const inputHandler = (e) => {
    // * convert input text to lower case
    // console.log("input handler TRIGGERED", e)
    // console.log("SEARCH INPUT:")
    let lowerCase = e.target.value.toLowerCase();
    // console.log("SEARCH INPUT:", searchInput)
    setSearch(lowerCase);
  };

  const setTracking = (method, path) => {
    setTrackingURI(trackingURI => [...trackingURI, {
      method: method,
      path : path
    }])
  }

  //fetch the URI List from the backend when the component mounts
  useEffect(() => {
    fetch(`http://localhost:${process.env.PORT}/routes`)
      .then((response) => response.json())
      .then((data) => {
        setURIList(() => data);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("Invalid fetch request for the URI List");
        // * reset the error message
        setTimeout(() => setErrorMessage(""), 5000);
      });
    }, []);

    useEffect(()=>{
      fetch(`http://localhost:${process.env.PORT}/routes`, {
        "mode": 'no-cors',
        "method": 'POST',
        'headers': {
          'Content-Type': 'application/json'
        },
        'body': JSON.stringify(trackingURI)
      }).then((data)=>{
        console.log(data)
      }).catch((err)=>{
        console.log(`there was an error sending the URI tracking list, error: ${err}`)
      })
    }, [trackingURI])
  
  return(
    <div className='URIListContainer'>
      <SearchBar searchInput = {searchInput} setSearch = {setSearch}/>
      <div className='URIEntries'>
        {errorMessage !== '' ? <FlashError errorMessage={errorMessage}/> : null}
        <table>
          <thead>
            <tr>
              <th>Tracking</th>
              <th>Path</th>
              <th>Method</th>
              <th>Status Code</th>
            </tr>
          </thead>
          <tbody>
        { 
          URIList.filter(uriObject => {
              if (searchInput === '') {
                return uriObject;
              } else if (uriObject.path.toLowerCase() == searchInput) {
                // console.log("this is from insidr FILTER", uriObject.path)
                return uriObject.path;
              }
            }).map((element)=> {
              // console.log("this IS FROM MAP", element)
             return <URI 
              id={uuidv4()} 
              path={element.path} 
              method={element.method}
              status={element.status}
              setTracking={setTrackingURI} 
            />
          })}
          </tbody>
        </table>
      </div>
    </div>
    )}

export default URIList;
