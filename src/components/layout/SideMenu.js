import React, { useContext, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../../context/User/UserContext";
import UserBar from "./UserBar";

const SideMenu = () => {
  const { isCustomer, isAdmin } = useContext(UserContext);

  return (
    <div className="min-w-[250px] h-[100vh] sticky top-0 left-0 flex flex-col justify-between border-r relative border-gray-400">
      <div className="flex flex-col">
        <NavLink
          to="/app/home"
          className={({ isActive }) =>
            isActive ? "nav-link-active" : "nav-link"
          }
          end
        >
          Start
        </NavLink>
        <NavLink
          to="/app/repairs/all"
          className={({ isActive }) =>
            isActive ? "nav-link-active" : "nav-link"
          }
        >
          Naprawy
        </NavLink>
        {!isCustomer() && (
          <NavLink
            to="/app/customers"
            className={({ isActive }) =>
              isActive ? "nav-link-active" : "nav-link"
            }
          >
            Klienci
          </NavLink>
        )}
        {!isCustomer() && (
          <NavLink
            to="/app/devices"
            className={({ isActive }) =>
              isActive ? "nav-link-active" : "nav-link"
            }
          >
            Urządzenia
          </NavLink>
        )}
        {isAdmin() && (
          <NavLink
            to="/app/admin-panel"
            className={({ isActive }) =>
              isActive ? "nav-link-active" : "nav-link"
            }
          >
            Panel Administratora
          </NavLink>
        )}
      </div>
      <div>
        <UserBar />
      </div>
    </div>
  );
};
export default SideMenu;
