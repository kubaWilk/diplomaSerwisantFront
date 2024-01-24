import React, { useReducer, useEffect, useState } from "react";
import UserContext from "./UserContext";
import UserReducer from "./UserReducer";
import { SET_USER, USER_LOGOUT } from "../types";
import { Config } from "../../config";
import axios from "axios";

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
        authToken: storageItem.token,
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

  const getToken = () => {
    const sessionItem = JSON.parse(sessionStorage.getItem("user"));
    return sessionItem.token;
  };

  const updateUserData = async (userData) => {
    const res = await axios.get(`${Config.apiUrl}/user/${userData.id}`, {
      headers: { Authorization: `Bearer ${state.authToken}` },
    });

    const existingUser = Object.keys(res.data)
      .filter((objKey) => objKey !== "roles")
      .reduce((newObj, key) => {
        newObj[key] = res.data[key];
        return newObj;
      }, {});

    // console.log(existingUser);

    const userDataForRequest = {
      ...existingUser,
      userInfo: {
        id: userData.id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phoneNumber: userData.phoneNumber,
        city: userData.city,
        postCode: userData.postCode,
        street: userData.street,
      },
    };

    return axios.put(
      `${Config.apiUrl}/user/${userData.id}`,
      userDataForRequest,
      {
        headers: { Authorization: `Bearer ${state.authToken}` },
      }
    );
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        users: state.users,
        getToken,
        updateUserData,
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
