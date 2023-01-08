import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/User/UserContext";

const UserBar = () => {
  const { user, getRole, logout } = useContext(UserContext);
  return (
    <Fragment>
      <div className="p-2 border-t border-blackmd:absolute bottom-0 left-0">
        <div className="flex justify-between flex-col md:flex-row">
          <div className="flex">
            <div className="flex justify-center items-center w-[40px] h-[40px] rounded-full border-2 border-black">
              JW
            </div>
            <div className="flex flex-col ml-2">
              <Link
                to="/user/self/about"
                className="text-md"
              >{`${user.firstName} ${user.lastName}`}</Link>
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
    </Fragment>
  );
};

export default UserBar;
