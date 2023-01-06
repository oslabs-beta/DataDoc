import React, { useEffect, useState } from "react";
import {
  HashRouter as Router,
  Route,
  Routes,
  Link,
  useLocation,
} from "react-router-dom";
import "../styles/WorkspaceBox.scss";

const Workspaces = (props) => {
  const { id, name, domain, port, path, deleteWorkspace } = props;
  console.log("THIS IS THE ID: ", id);
  return (
    <>
      <div className="workspaceBox">
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
          <div>
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
        <div>
          <button
            // className="workspaceBox"
            onClick={() => deleteWorkspace(name)}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default Workspaces;
