import React, { useEffect, useState, useCallback } from "react";
import {Link, useNavigate} from 'react-router-dom'
// import ChartsContainer from "../containers/ChartsContainer";
const URI = (props) => {
  const { id, path, method, status } = props;
  const [ checked, setChecked ] = useState(true);
  const [charts, setCharts] = useState(false)
  const navigate = useNavigate()

  const handleClick = (e) => {
    // * incorporate functionality to stop the element from being tracked
    setChecked(!checked);
  };

  // const handleOnClick = useCallback(() => navigate(`/uri/${key}`, {replace: true}), [navigate]);

  const handleOnClick = () =>{
    setCharts(true)
  }
  console.log('PROPS: ', props)

  return (
    <>
      <tr>
        <td>
          <input
            type="checkbox"
            name="checkTrackingURI"
            onChange={()=>setChecked(!checked)}
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
      </tr>
    </>
  );
};
// const URI = (props) => {
//   const { id, path, method, status } = props;
//   const [ checked, setChecked ] = useState(true);
//   const [charts, setCharts] = useState(false)
//   const navigate = useNavigate()

//   const handleClick = (e) => {
//     // * incorporate functionality to stop the element from being tracked
//     setChecked(!checked);
//   };

//   // const handleOnClick = useCallback(() => navigate(`/uri/${key}`, {replace: true}), [navigate]);

//   const handleOnClick = () =>{
//     setCharts(true)
//   }
//   console.log('PROPS: ', props)

//   return (
//     <>
//       <tr>
//         <td>
//           <input
//             type="checkbox"
//             name="checkTrackingURI"
//             onClick={(e) => handleClick(e)}
//           >
//           </input>
//         </td>
//         <td>
//           <Link to={`/uri/${id}`} id={id} path={path}>{path}</Link>
//         </td>
//         {/* <td>
//           <div type="text" onClick={handleOnClick}>{path}</div>
//         </td> */}
//         <td>
//           {method}
//         </td>
//         <td>
//           <span
//             style={
//               status === 200
//                 ? { backgroundColor: "green" }
//                 : status > 200 && status < 400 ? {backgroundColor : "yellow"}
//                 : { backgroundColor: "red" }
//             }
//           >
//             {status}
//           </span>
//         </td>
//       </tr>
//     </>
//   );
// };

export default URI;
