import React, { useEffect, useState, useCallback } from "react";
import {Link, useNavigate} from 'react-router-dom'

const URI = (props) => {
  const { id, path, method, status, addToTracking, removeFromTracking } = props;
  const [ checked, setChecked ] = useState(false);
  const [charts, setCharts] = useState(false)

  const handleClick = (method, path) => {
    setChecked(!checked);
    console.log(props.method, props.path);
    // if (checked) addToTracking(method, path)
    // else removeFromTracking(method, path);
  };

  return (
    <>
      <tr>
        <td>
          <input
            type="checkbox"
            name="checkTrackingURI"
            onChange={handleClick}
            checked={checked}
          >
          </input>
        </td>
        <td>
          <Link to={`/uri/${id}`} state={{
              method: method,
              path: path
            }} id={id} method={method} path={path}>{path}</Link>
        </td>
        <td>
          {method}
        </td>
        <td>
          <span
            style={
              status === 200
                ? { backgroundColor: "limegreen" }
                : status > 200 && status < 400 ? {backgroundColor : "yellow"}
                : { backgroundColor: "red" }
            }
          >
            {status}
          </span>
        </td>
        <td>
          <Link to={`/development/${id}`} state={{
              method: method,
              path: path
            }} id={id} method={method} path={path}><button>CLICK ME</button></Link>
        </td>
      </tr>
    </>
  );
};

export default URI;
