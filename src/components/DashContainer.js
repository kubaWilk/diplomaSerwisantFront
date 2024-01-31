import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./layout/Navbar";
import SideMenu from "./layout/SideMenu";
import UserContext from "../context/User/UserContext";

const DashContainer = (props) => {
  return (
    <div className="w-screen">
      <Navbar />
      <div className="flex screen-height relative">
        <SideMenu />
        <div className="flex flex-col w-full flex-start items-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashContainer;
