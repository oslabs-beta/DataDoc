import React, { useEffect, useState } from "react";
import { Box, Card, Container, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import Grid from "@mui/material/Unstable_Grid2";
import WorkspaceCard from "./WorkspaceCard.jsx";
import "../styles/AddWorkspace.scss";
import { useTheme } from "@mui/material";
import { tokens } from "../containers/theme";

const { SERVER_URL } = process.env;

const Home = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [workspaceList, setWorkspaceList] = useState([]);
  const [showNewWorkspacePopUp, setShowNewWorkspacePopUp] = useState(false);
  const [workspaceValues, setWorkspaceValues] = useState({
    name: "",
    domain: "",
    port: "",
    workspaceId: "",
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
        <label htmlFor="workspacePort">Enter the workspace application server port:</label>
        <input
          name="workspacePort"
          className="workspacePort"
          type="number"
          onChange={(e) => handleChange(e, "port")}
          required
        ></input>
        <label htmlFor="workspacePort">Enter the workspace metrics server port:</label>
        <input
          name="metricsPort"
          className="metricsPort"
          type="number"
          onChange={(e) => handleChange(e, "metricsPort")}
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

  const deleteWorkspaceById = (workspaceId) => {
    fetch(`${SERVER_URL}/workspaces`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ workspace_id: workspaceId })
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
    height: "170px",
    minwidth: "60px",
    padding: "20px",
    boxShadow: "0px 0px 8px 4px rgba(0, 0, 0, 0.04)",
    cursor: "pointer",
    backgroundColor: `${colors.secondary[100]}`
  };

  return (
    <>
      <Typography variant="h1" fontWeight={600}>
        Welcome to DataDoc
      </Typography>
      <Typography variant="h3" fontWeight={600} mb="20px">
        Workspaces:
      </Typography>
      <Grid container spacing={2}>
        {workspaceList.map((workspace) => {
          return (
            <Grid
              item
              xs={12 / 1}
              sm={12 / 2}
              md={12 / 3}
              lg={12 / 4}
              xl={12 / 5}
              key={crypto.randomUUID()}
            >
              <Card variant="outlined" sx={cardStyle}>
                <WorkspaceCard
                  workspaceId={workspace._id}
                  name={workspace.name}
                  domain={workspace.domain}
                  port={workspace.port}
                  metricsPort={workspace.metrics_port}
                  deleteWorkspace={deleteWorkspaceById}
                />
              </Card>
            </Grid>
          );
        })}
        <Grid item xs={12 / 1} sm={12 / 2} md={12 / 3} lg={12 / 4} xl={12 / 5}>
          <Card
            variant="outlined"
            sx={{
              ...cardStyle,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => setShowNewWorkspacePopUp(true)}
          >
            <Add />
            {showNewWorkspacePopUp && newWorkspaceForm}
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
