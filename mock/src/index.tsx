import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";


// Finds the root element and starts rendering React there.
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
// Render starting with the App components.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
