import React, { useEffect, useState } from 'react';
//generates unique keys
import { v4 as uuidv4 } from 'uuid';

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
  useEffect(()=> {
    fetch(`http://localhost:${process.env.PORT}/routes`)
     .then(response=>response.json())
     .then(data=>{
      setURIList(()=> data)
      }).catch((err)=>{
        console.log(err)
        setErrorMessage('Invalid fetch request for the URI List')
        // reset the error message
        setTimeout(()=> setErrorMessage(''), 5000)
      })
  },[])

  return(
    <div className='URIListContainer'>
      <SearchBar onChange ={inputHandler}/>
      <div className='URIEntries'>
        {errorMessage !== '' ? <FlashError errorMessage={errorMessage}/> : null}
        {
        URIList.filter(URI => {
          if (URI === '') {
            return URI;
          } else if (URI.endpoint.toLowerCase().includes(URI.toLowerCase())) {
            return URI;
          }
        }).map((element)=>{
          return <URI key={uuidv4()} endpoint={element.endpoint} status={element.status}/>
        })}
      </div>
    </div>
  )
}

export default URIList