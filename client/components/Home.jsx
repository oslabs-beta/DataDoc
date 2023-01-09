import React, { useEffect, useState } from "react";
import { Card, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Workspace from "./Workspace.jsx";
import "../styles/AddWorkspace.scss";

const { SERVER_URL } = process.env;

const Home = (props) => {
  const [workspaceList, setWorkspaceList] = useState([]);
  const [showNewWorkspacePopUp, setShowNewWorkspacePopUp] = useState(false);
  const [workspaceValues, setWorkspaceValues] = useState({
    name: "",
    domain: "",
    port: 0
    // workspace_id: null,
  });

  const handleChange = (e, updateValue) => {
    let updatedState;
    let workspaceUpdate;
    workspaceUpdate = { [updateValue]: e.target.value };
    updatedState = {
      ...workspaceValues,
      ...workspaceUpdate
    };
    setWorkspaceValues(updatedState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${SERVER_URL}/workspaces`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(workspaceValues)
    })
      .then(() => {
        getAllWorkspaces();
      })
      .then(() => {
        setWorkspaceValues({
          name: "",
          domain: "",
          port: 0
        });
      })
      .then(() => {
        setShowNewWorkspacePopUp(false);
      })
      .catch((err) => {
        console.log(
          `there wan an error submitting a new workspace, err: ${err}`
        );
      });
  };

  //set the values for the new workspace
  const newWorkspaceForm = (
    <form className="modal" onSubmit={() => handleSubmit(e)}>
      <div className="modal-content">
        <button
          className="close-button"
          onClick={() => setShowNewWorkspacePopUp(false)}
        >
          X
        </button>
        <h4 className="modal-header">Add a new workspace:</h4>
        <label htmlFor="workspaceName">Enter the workspace name:</label>
        <input
          name="workspaceName"
          className="workspaceName"
          type="text"
          onChange={(e) => handleChange(e, "name")}
          required
        ></input>
        <label htmlFor="workspaceDomain">Enter the workspace domain:</label>
        <input
          name="workspaceDomain"
          className="workspaceDomain"
          type="text"
          onChange={(e) => handleChange(e, "domain")}
          required
        ></input>
        <label htmlFor="workspacePort">Enter the workspace port:</label>
        <input
          name="workspacePort"
          className="workspacePort"
          type="number"
          onChange={(e) => handleChange(e, "port")}
          required
        ></input>
        <button
          className="submit-button"
          type="submit"
          onClick={(e) => handleSubmit(e)}
          // onClick={() => setShowNewWorkspacePopUp(false)}
        >
          SUBMIT
        </button>
      </div>
    </form>
  );

  //fetch the workspace list from the backend when the component mounts
  useEffect(() => {
    getAllWorkspaces();
  }, []);

  const getAllWorkspaces = () => {
    fetch(`http://localhost:${process.env.PORT}/workspaces`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setWorkspaceList(data);
      })
      .catch((err) => {
        console.log(`there was an error: ${err}`);
      });
  };

  const deleteWorkspaceById = (workspace_id) => {
    fetch(`${SERVER_URL}/workspaces`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ workspace_id })
    })
      .then((workspace) => {
        getAllWorkspaces();
      })
      .catch((err) => {
        console.log(`there was an error deleting a workspace, error: ${err}`);
      });
  };

  // const deleteSpecificWorkspace = (name) => {
  //   // console.log("in the process of deleting a workspace");
  //   const updatedWorkspaceList = workspaceList.filter(
  //     (item) => item.name !== name
  //   );
  //   getWorkSpaceList();
  // };

  const cardStyle = {
    // boxSizing: 'border-box',
    borderRadius: "10px",
    minHeight: "120px",
    minWidth: "60px",
    padding: "20px",
    boxShadow: "0px 0px 8px 4px rgba(0, 0, 0, 0.04)",
    cursor: "pointer"
  };

  return (
    <>
      <Typography 
        variant="h1"
        fontWeight={600}
      >
        Welcome to DataDoc
      </Typography>
      <Typography
        variant="h3"
        fontWeight={600}
        mb="20px"
      >
        Workspaces:
      </Typography>
      <Grid container spacing={2}>
        {workspaceList.map((workspace) => {
          return (
            <Grid 
              xs={12} 
              sm={6} 
              md={4} 
              lg={3}
              key={crypto.randomUUID()}
            >
              <Card variant="outlined" sx={cardStyle}>
                <Workspace
                  workspace_id={workspace._id}
                  name={workspace.name}
                  domain={workspace.domain}
                  port={workspace.port}
                  deleteWorkspace={deleteWorkspaceById}
                />
              </Card>
            </Grid>
          );
        })}
        <Grid>
          <Card
            variant="outlined"
            sx={cardStyle}
            onClick={() => setShowNewWorkspacePopUp(true)}
          >
            <span
              style={{
                alignSelf: "center",
                justify: "center"
              }}
            >
              +
            </span>
            {/* <svg
              // className="workspaceBox"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-plus-square"
              viewBox="0 0 16 16"
            >
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg> */}
            {showNewWorkspacePopUp && newWorkspaceForm}
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
