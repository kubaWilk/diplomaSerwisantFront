import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import RepairsState from "./context/Repairs/RepairsState";
import SingleRepairState from "./context/SingleRepair/SingleRepairState";
import AlertState from "./context/Alert/AlertState";
import UserState from "./context/User/UserState";

const root = ReactDOM.createRoot(document.getElementById("root"));

// if (module.hot) {
//   module.hot.accept();
// }

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AlertState>
        <UserState>
          <RepairsState>
            <SingleRepairState>
              <App />
            </SingleRepairState>
          </RepairsState>
        </UserState>
      </AlertState>
    </BrowserRouter>
  </React.StrictMode>
);
