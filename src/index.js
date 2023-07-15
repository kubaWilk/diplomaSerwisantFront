import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RepairsState from "./context/Repairs/RepairsState";
import SingleRepairState from "./context/SingleRepair/SingleRepairState";
import AlertState from "./context/Alert/AlertState";
import UserState from "./context/User/UserState";
import LoginPage from "./components/pages/Login/LoginPage";
import PasswordReset from "./components/pages/Login/PasswordReset/PasswordReset";
import NewPassword from "./components/pages/Login/PasswordReset/NewPassword";

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
              <Routes>
                <Route exact path="/" element={<App />} />
              </Routes>
              <App />
            </SingleRepairState>
          </RepairsState>
        </UserState>
      </AlertState>
    </BrowserRouter>
  </React.StrictMode>
);
