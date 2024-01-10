import React, { useReducer, useEffect, useState } from "react";
import UserContext from "./UserContext";
import UserReducer from "./UserReducer";
import { SET_USER, USER_LOGOUT } from "../types";

const UserState = (props) => {
  const initialState = {
    authToken: "",
    user: {},
  };

  const initializeDispatcher = () => {
    const storageItem = JSON.parse(sessionStorage.getItem("user"));

    if (storageItem !== null) {
      return {
        user: storageItem.user,
        authToken: storageItem.authToken,
      };
    }

    return initialState;
  };

  const [state, dispatch] = useReducer(
    UserReducer,
    initialState,
    initializeDispatcher
  );

  const setUser = (data) => {
    dispatch({
      type: SET_USER,
      payload: data,
    });
  };

  const isLoggedIn = () => {
    return sessionStorage.getItem("user") != null;
  };

  const logout = () => {
    localStorage.removeItem("user");
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

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        users: state.users,
        isLoggedIn,
        setUser,
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
