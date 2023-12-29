import React, { useReducer } from "react";
import UserContext from "./UserContext";
import UserReducer from "./UserReducer";
import { SET_USER, USER_LOGOUT } from "../types";

const UserState = (props) => {
  const initialState = {
    authToken: "",
    user: {},
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  const setUser = (data) => {
    dispatch({
      type: SET_USER,
      payload: data,
    });
  };

  const checkSession = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user !== null) {
      setUser(user);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("user");
    dispatch({
      type: USER_LOGOUT,
    });
  };

  const getRoles = () => {
    return state.user.roles;
  };

  const isCustomer = () => {
    let isOnlyCustomer = true;

    getRoles().forEach((element) => {
      if (element === "ROLE_ADMIN" || element === "ROLE_EMPLOYEE")
        isOnlyCustomer = false;
    });

    return isOnlyCustomer;
  };

  const isAdmin = () => {
    let isAdmin = false;

    getRoles().forEach((element) => {
      if (element === "ROLE_ADMIN") isAdmin = true;
    });

    return isAdmin;
  };

  const isLoggedIn = () => {
    return Object.keys(state.user).length !== 0;
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        users: state.users,
        isLoggedIn,
        setUser,
        checkSession,
        getRoles,
        logout,
        isCustomer,
        isAdmin,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
