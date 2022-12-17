import React, { useEffect, useState } from "react";
//generates unique keys
import { v4 as uuidv4 } from "uuid";

//import other components here
import URI from './URI.jsx'
import FlashError from './FlashError.jsx';
import SearchBar from './SearchBar.jsx';



const URIList=(props)=>{
  const [URIList, setURIList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchInput, setSearch] = useState('');

  const inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setSearch(lowerCase);
  };


  //fetch the URI List from the backend when the component mounts
  useEffect(() => {
    fetch(`http://localhost:${process.env.PORT}/routes`)
      .then((response) => response.json())
      .then(res => console.log("this is fetch", res))
      .then((data) => {
        setURIList(() => data);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("Invalid fetch request for the URI List");
        // reset the error message
        setTimeout(() => setErrorMessage(""), 5000);
      });
    }, []);

    console.log("THIS is state",URIList)

    return(
      <div className='URIListContainer'>
      <SearchBar onChange ={inputHandler}/>
      <div className='URIEntries'>
        {errorMessage !== '' ? <FlashError errorMessage={errorMessage}/> : null}
        <table>
          <thead>
            <tr>
              <th>Tracking</th>
              <th>URI Endpoint</th>
              <th>Status Code</th>
            </tr>
          </thead>
          <tbody>
        { 
        URIList.map((element)=>{
          return <URI key={uuidv4()} method ={element.method} endpoint={element.path} status={element.status}/>
        })}
        </tbody>
        </table>
        </div>
        </div>
    
    )}

    // filter(URI => {
    //   if (URI === '') {
    //     return URI;
    //   } else if (URI.path.includes(URI)) {
    //     return URI;
    //   }
    // })
   
export default URIList;
