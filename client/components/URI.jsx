import React, { useEffect, useState } from "react";

const URI = (props) => {
  const { path, method, status } = props;
  const [ checked, setChecked ] = useState(true);

  const handleClick = (e) => {
    // * incorporate functionality to stop the element from being tracked
    setChecked(!checked);
  };

  return (
    <>
      <tr>
        <td>
          <input
            type="checkbox"
            name="checkTrackingURI"
            onClick={(e) => handleClick(e)}
          >
          </input>
        </td>
        <td>
          {path}
        </td>
        <td>
          {method}
        </td>
        <td>
          <span
            style={
              status === 200
                ? { backgroundColor: "green" }
                : { backgroundColor: "red" }
            }
          >
            {status}
          </span>
        </td>
      </tr>
    </>
  );
};

export default URI;
