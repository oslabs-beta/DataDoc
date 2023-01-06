import React, { useEffect, useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "../styles/WorkspaceBox.scss";
import { Link, useLocation } from "react-router-dom";

const Workspaces = (props) => {
  const { id, name, domain, port, path } = props;
  // const handleClick = () => {};
  // const location = useLocation();
  // const { id, name, domain } = location.state;
  // console.log("these are the workspace props: ", location.state);

  // const location = useLocation();
  // const { method } = location.state;
  // const { path } = location.state;
  return (
    <>
      <Link
        //link to the uri list for the clicked workspace
        to={`/urilist/${id}`}
        state={{
          id: id,
          name: name,
          domain: domain,
        }}
        id={id}
        name={name}
        domain={domain}
      >
        <div className="workspaceBox">
          <label htmlFor="workspaceName">Workspace Name: </label>
          <span id="workspaceName">{name}</span>
          <p>
            <label htmlFor="workspaceDomain">Domain: </label>
            <span id="workspaceDomain">{domain}</span>
          </p>
          <p>
            <label htmlFor="workspacePort">Port: </label>
            <span id="workspacePort">{port}</span>
          </p>
        </div>
      </Link>
    </>
  );
};

export default Workspaces;

// const Workspaces = (props) => {
//   const { name, domain, port, path } = props;
//   console.log("THIS IS THE REQ.BODY: ", props);
//   const handleClick = () => {};
//   return (
//     <>
//       <div className="workspaceBox">
//         <label htmlFor="workspaceName">Workspace Name: </label>
//         <span id="workspaceName">{name}</span>
//         <p>
//           <label htmlFor="workspaceDomain">Domain: </label>
//           <span id="workspaceDomain">{domain}</span>
//         </p>
//         <p>
//           <label htmlFor="workspacePort">Port: </label>
//           <span id="workspacePort">{port}</span>
//         </p>
//       </div>
//     </>
//   );
// };
