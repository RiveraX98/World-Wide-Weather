import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import { Map } from "./Map";


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(<Route path="/" element={<Map />} />)
  );

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
