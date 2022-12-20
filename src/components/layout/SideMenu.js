import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../../context/User/UserContext";

const SideMenu = () => {
  const { logout, user, getRole } = useContext(UserContext);

  return (
    <div className="min-w-[25%] flex flex-col justify-between border-r border-gray-400 reltive">
      <div className="flex flex-col">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-link-active" : "nav-link"
          }
          end
        >
          Start
        </NavLink>
        <NavLink
          to="/repairs"
          className={({ isActive }) =>
            isActive ? "nav-link-active" : "nav-link"
          }
        >
          Naprawy
        </NavLink>
        <NavLink
          to="/customers"
          className={({ isActive }) =>
            isActive ? "nav-link-active" : "nav-link"
          }
        >
          Klienci
        </NavLink>
        <NavLink
          to="/devices"
          className={({ isActive }) =>
            isActive ? "nav-link-active" : "nav-link"
          }
        >
          Urządzenia
        </NavLink>
        <NavLink
          to="/admin-panel"
          className={({ isActive }) =>
            isActive ? "nav-link-active" : "nav-link"
          }
        >
          Panel Administratora
        </NavLink>
      </div>
      <div>
        <div className="p-2 border-t border-black">
          <div className="flex justify-between flex-col md:flex-row">
            <div className="flex">
              <div className="flex justify-center items-center w-[40px] h-[40px] rounded-full border-2 border-black">
                JW
              </div>
              <div className="flex flex-col ml-2">
                <h3 className="text-md">{`${user.firstName} ${user.lastName}`}</h3>
                <p className="text-xs">{getRole()}</p>
              </div>
            </div>
            <button
              className="px-2 mt-2 md:m-0 py-[3px] border-2 border-black font-bold hover:text-white hover:bg-black duration-100"
              onClick={logout}
            >
              Wyloguj
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SideMenu;
