import "./App.css";
import "./index.css";
import React, { useContext, createContext, useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import SideMenu from "./components/layout/SideMenu";
import Repairs from "./components/pages/Repairs/Repairs";
import { Routes, Route } from "react-router-dom";
import LoginState from "./context/Login/LoginState";
import LoginContext from "./context/Login/LoginContext";
import LoginPage from "./components/pages/Login/LoginPage";
import { useState } from "react";

function App() {
  const [loginToggle, setLoginToggle] = useState(false);

  return (
    <LoginState loginToggle={setLoginToggle}>
      {loginToggle ? (
        <div>
          <Navbar />
          <div className="flex">
            <SideMenu />
            <Routes>
              <Route exact path="/repairs" element={<Repairs />} />
            </Routes>
          </div>
        </div>
      ) : (
        <LoginPage />
      )}
    </LoginState>
  );
}

export default App;
