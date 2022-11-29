import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import UserState from "./context/User/UserState";
import RepairsState from "./context/Repairs/RepairsState";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <RepairsState>
        <UserState>
          <App />
        </UserState>
      </RepairsState>
    </BrowserRouter>
  </React.StrictMode>
);
