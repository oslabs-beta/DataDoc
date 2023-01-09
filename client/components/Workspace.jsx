import { Button, Typography } from "@mui/material";
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
          <Typography 
            variant="h4"
            fontWeight="600"
          >
            {name}
          </Typography>
          <Typography
            variant="subtitle1"
          >
            Domain: {domain}
          </Typography>
          <Typography
            variant="subtitle1"
            mb="10px"
          >
            Port: {port || "N/A"}
          </Typography>
        </div>
        <div>
          <Button 
            variant="outlined"
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
