import React, { useEffect, useState } from "react";
//generates unique keys
import { v4 as uuidv4 } from "uuid";

//import other components here
import URI from "./URI.jsx";
import FlashError from "./FlashError.jsx";

const URIList = (props) => {
  const [URIList, setURIList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

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
        // reset the error message
        setTimeout(() => setErrorMessage(""), 5000);
      });
  }, []);
  return (
    <div className="URIListContainer">
      <div className="URIEntries">
        {errorMessage !== "" ? (
          <FlashError errorMessage={errorMessage} />
        ) : null}
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
            {URIList.map((element) => {
              return (
                <URI
                  key={uuidv4()}
                  method={element.method}
                  path={element.path}
                  status={element.status}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default URIList;
