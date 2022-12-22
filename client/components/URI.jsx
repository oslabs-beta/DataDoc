import React, { useEffect, useState, useCallback } from "react";
import {Link, useNavigate} from 'react-router-dom'
// import ChartsContainer from "../containers/ChartsContainer";
const URI = (props) => {
  const { id, path, method, status, addToTracking, removeFromTracking, setMonitoring } = props;
  const [ checked, setChecked ] = useState(false);
  const [charts, setCharts] = useState(false)

  useEffect(()=>{
    setMonitoring(true)
  })

  const handleClick = (method, path) => {
    if(checked === false){
      addToTracking(props.method, props.path)
    } else if (checked === true){
      removeFromTracking(props.method, props.path)
    }
    setChecked(!checked);
  };


  return (
    <>
      <tr>
        <td>
          <input
            type="checkbox"
            name="checkTrackingURI"
            onChange={()=>{
              handleClick()
            }}
            checked={checked}
          >
          </input>
        </td>
        <td>
          <Link to={`/uri/${id}`} id={id} path={path}>{path}</Link>
        </td>
        <td>
          {method}
        </td>
        <td>
          <span
            style={
              status === 200
                ? { backgroundColor: "green" }
                : status > 200 && status < 400 ? {backgroundColor : "yellow"}
                : { backgroundColor: "red" }
            }
          >
            {status}
          </span>
        </td>
        <td>
          <Link to={`/development/${id}`} id={id} path={path}><button>CLICK ME</button></Link>
        </td>
      </tr>
    </>
  );
};

export default URI;
