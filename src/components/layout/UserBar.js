import React, { Fragment, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/User/UserContext";

const UserBar = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const getInitials = () => {
    let initials = "";

    if (
      user.userDetails.firstName.length <= 0 ||
      user.userDetails.lastName.length <= 0
    )
      return "AA";

    initials += user.userDetails.firstName[0].toUpperCase();
    initials += user.userDetails.lastName[0].toUpperCase();

    return initials;
  };

  return (
    <Fragment>
      <div className="p-2 border-t border-blackmd:absolute bottom-0 left-0">
        <div className="flex justify-between flex-col md:flex-row">
          <div className="flex">
            <div className="flex justify-center items-center w-[40px] h-[40px] rounded-full border-2 border-black">
              {getInitials()}
            </div>
            <div className="flex flex-col ml-2 justify-center">
              <Link
                to="/user/self/about"
                className="text-md"
              >{`${user.userDetails.firstName} ${user.userDetails.lastName}`}</Link>
            </div>
          </div>
          <button
            className="px-2 mt-2 md:m-0 py-[3px] border-2 border-black font-bold hover:text-white hover:bg-black duration-100"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            Wyloguj
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default UserBar;
