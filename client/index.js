import React from "react";
import { createRoot } from "react-dom/client";
// import { render } from "react-dom";
// import App from "./components/App.jsx";

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <>
    Text from index.js
    {/* <App /> */}
    </>
)