import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import RepairsState from "./context/Repairs/RepairsState";
import SingleRepairState from "./context/SingleRepair/SingleRepairState";
import AlertState from "./context/Alert/AlertState";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AlertState>
        <RepairsState>
          <SingleRepairState>
            <App />
          </SingleRepairState>
        </RepairsState>
      </AlertState>
    </BrowserRouter>
  </React.StrictMode>
);
