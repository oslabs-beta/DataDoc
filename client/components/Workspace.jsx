import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/WorkspaceBox.scss";

const Workspace = (props) => {
  const { workspace_id, name, domain, port, deleteWorkspace } = props;
  return (
    <>
      <div className="workspaceBox">
        <Link
          // * link to the uri list for the clicked workspace
          to={`/urilist/${workspace_id}`}
          state={{
            workspace_id: workspace_id,
            name: name,
            domain: domain
          }}
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
              <span className="workspacePort">{port || "N/A"}</span>
            </p>
          </div>
        </Link>
        <div>
          <button
            // className="workspaceBox"
            onClick={() => deleteWorkspace(workspace_id)}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default Workspace;
