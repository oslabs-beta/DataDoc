import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/WorkspaceBox.scss";

const Workspace = (props) => {
  const { workspaceId, name, domain, port, path, deleteWorkspace } = props;
  return (
    <>
      <div className="workspaceBox">
        <Link
          // * link to the uri list for the clicked workspace
          to={`/urilist/${workspaceId}`}
          state={{
            workspaceId: workspaceId,
            name: name,
            domain: domain
          }}
          // workspaceId={workspaceId}
          name={name}
          domain={domain}
        >
          <div>
            <label htmlFor="workspaceName">Workspace Name: </label>
            <span className="workspaceName">{name}</span>
            <p>
              <label htmlFor="workspaceDomain">Domain: </label>
              <span className="workspaceDomain">{domain}</span>
            </p>
            <p>
              <label htmlFor="workspacePort">Port: </label>
              <span className="workspacePort">{port}</span>
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

export default Workspace;
