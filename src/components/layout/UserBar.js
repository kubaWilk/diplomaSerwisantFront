import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const UserBar = ({ user, role, onLogout }) => {
  const navigate = useNavigate();
  return (
    <Fragment>
      <div className="p-2 border-t border-blackmd:absolute bottom-0 left-0">
        <div className="flex justify-between flex-col md:flex-row">
          <div className="flex">
            <div
              data-testid="avatar"
              className="flex justify-center items-center w-[40px] h-[40px] rounded-full border-2 border-black"
            >
              {`${user.firstName[0]}${user.lastName[0]}`}
            </div>
            <div className="flex flex-col ml-2">
              <Link
                to="/user/self/about"
                className="text-md"
              >{`${user.firstName} ${user.lastName}`}</Link>
              <p className="text-xs">{role}</p>
            </div>
          </div>
          <button
            className="px-2 mt-2 md:m-0 py-[3px] border-2 border-black font-bold hover:text-white hover:bg-black duration-100"
            onClick={() => {
              navigate("/");
              onLogout();
            }}
          >
            Wyloguj
          </button>
        </div>
      </div>
    </Fragment>
  );
};

UserBar.propTypes = {
  user: PropTypes.object.isRequired,
  role: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default UserBar;
