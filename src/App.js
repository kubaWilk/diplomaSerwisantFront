import "./App.css";
import Dashboard from "./components/layout/Dashboard";
import SideMenu from "./components/layout/SideMenu";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Login from "./components/pages/Login";

//"/" path has to stay on the bottom, otherwise navbar will always show it, other paths should be added without "/"
const paths = {
  repairs: "naprawy",
  customers: "klienci",
  stats: "statystyki",
  users: "użytkownicy",
  "/": "start",
};

function App() {
  const [sectionName, setSectionName] = useState("Start");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  //TODO: keeping state of logged in user in localStorage i.e.

  const location = useLocation();

  const translatePathToName = (path, pahtsToTranslate) => {
    for (const [key, value] of Object.entries(pahtsToTranslate)) {
      if (path.includes(key)) return value;
    }
  };

  React.useEffect(() => {
    setSectionName(translatePathToName(location.pathname, paths));
  }, [location]);

  const onLogout = () => {
    setIsUserLoggedIn(false);
    setUserInfo = {};
    console.log("should logout");
  };

  return (
    <div className="app">
      {isUserLoggedIn ? (
        <div id="wrapper">
          <SideMenu text="Serwisant PRO" />
          <Dashboard
            onLogout={onLogout}
            userInfo={userInfo}
            sectionName={sectionName}
          />
        </div>
      ) : (
        <Login userToggle={setIsUserLoggedIn} userInfoSetter={setUserInfo} />
      )}
    </div>
  );
}

export default App;
