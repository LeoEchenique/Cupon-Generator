import React from "react";
import ReactDOM from "react-dom/client";
import "./appStyles/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./components/about/About";
import Dashboard from "./components/dashboard/Dashboard";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path= "/"  element={<App />} />
        <Route path={`/inicio/:token`} element={<Dashboard />} />
        <Route path="/about" element={[ <About key="5"/> ]} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
