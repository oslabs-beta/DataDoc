import React from "react";
import { Routes, Route } from "react-router-dom";

// importing component files
import URIList from "./components/URIList.jsx";
import URI from './components/URI.jsx'

function Page() {
  return (
    <Routes>
      <Route path="/URIList" element={<URIList />} />
      <Route path='/URI' element={<URI />} />
    </Routes>
  );
}

export default Page;
