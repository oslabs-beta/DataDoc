import React from "react";
import { createRoot } from "react-dom/client";
import App from "./containers/App.jsx";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <>
    <App />
  </>
);
