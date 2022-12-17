import React, { useEffect, useState } from "react";

const URI = (props) => {
  const { endpoint, status } = props;
  const { checked, setChecked } = useState(true);

  const handleClick = (e) => {
    //incorporate functionality to stop the element from being tracked
    setChecked(!checked);
  };

  return (
    <>
      <tr>
        <td>
          <input
            type="checkbox"
            id="checked"
            name="checkTrackingURI"
            onClick={(e) => handleClick(e)}
          >
            {checked}
          </input>
        </td>
        <td>
          <field>{endpoint}</field>
        </td>
        <td>
          {/* <field style= {{status === 200 ? backgroundColor:'green' : backgroundColor: 'red' }}>{status}</field> */}
          <field>{status}</field>
        </td>
      </tr>
    </>
  );
};

export default URI;
