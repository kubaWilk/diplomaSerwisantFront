import "./App.css";
import "./index.css";
import Navbar from "./components/layout/Navbar";
import SideMenu from "./components/layout/SideMenu";
import Repairs from "./components/pages/Repairs/Repairs";
import { Routes, Route } from "react-router-dom";
import UserState from "./context/Login/UserState";
import LoginPage from "./components/pages/Login/LoginPage";
import { useState } from "react";
import AlertState from "./context/Alert/AlertState";

function App() {
  const [loginToggle, setLoginToggle] = useState(false);

  return (
    <AlertState>
      <UserState loginToggle={setLoginToggle}>
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
      </UserState>
    </AlertState>
  );
}

export default App;
