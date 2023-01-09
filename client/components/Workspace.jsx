import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/WorkspaceBox.scss";

const Workspace = (props) => {
  const { workspace_id, name, domain, port, deleteWorkspace } = props;
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <>
      <div className="workspaceBox">
        <div
          onClick={() => {
            navigate(`/urilist/${workspace_id}`, {
            state: {
              workspace_id: workspace_id,
              name: name,
              domain: domain
            }
          })}}
        >
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
        <div>
          <Button 
            variant="outlined"
            // color="error"
            color="customRed"
            onClick={() => deleteWorkspace(workspace_id)}
          >
            Delete
          </Button>
        </div>
      </div>
    </>
  );
};

export default Workspace;
