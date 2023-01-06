import React, { useEffect, useState } from "react";
import Workspace from "./Workspace.jsx";

const Home = (props) => {
  const [workspaceList, setWorkspaceList] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true);
  //fetch the workspace list from the backend when the component mounts
  useEffect(() => {
    getWorkSpaceList();
    if (firstLoad) {
      setFirstLoad(false);
      return;
    }
  }, []);

  const getWorkSpaceList = () => {
    fetch(`http://localhost:${process.env.PORT}/workspaces`)
      .then((response) => response.json())
      .then((data) => {
        setWorkspaceList(data);
        // console.log("this is the workspace data", workspaceList);
      })
      .catch((err) => {
        console.log(`there was an error: ${err}`);
      });
  };
  return (
    <>
      <h1>Welcome to Datatective</h1>
      <h2>Workspaces:</h2>
      <div>
        {workspaceList.map((workspace) => {
          return (
            <Workspace
              key={crypto.randomUUID()}
              // id={_id}
              name={workspace.name}
              domain={workspace.domain}
              port={workspace.port}
              path={workspace.path}
            />
          );
        })}
      </div>
    </>
  );
};

export default Home;
