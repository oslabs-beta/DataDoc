import React from "react";
import { HashRouter, Link } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./containers/App.jsx";
import Page from "./Page.jsx";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <HashRouter>
    <Link to="/URIList">Link to URI List</Link>
    <br></br>
    <Link to="/URIt">URI</Link>
    {/* <App /> */}
    <Page />
  </HashRouter>
);
