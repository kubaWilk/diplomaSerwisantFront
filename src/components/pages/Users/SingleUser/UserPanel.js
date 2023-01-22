import React from "react";
import { Link, Outlet } from "react-router-dom";
import SectionName from "../../../layout/SectionName";

const UserPanel = () => {
  return (
    <div className="flex flex-col items-center justify-start w-full">
      <SectionName text="Ustawienia konta" />
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex space-x-5">
          <Link className="button-lg" to="/user/self/about/edit">
            Zmień dane konta
          </Link>
          <Link className="button-lg" to="/user/self/about/password-change">
            Zmień hasło
          </Link>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default UserPanel;
