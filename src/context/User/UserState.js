import React, { useContext, useReducer } from "react";
import UserContext from "./UserContext";
import UserReducer from "./UserReducer";
import { LOG_IN_USER, USER_LOGOUT } from "../types";
import axios from "axios";
import AlertContext from "../Alert/AlertContext";
import { Config } from "../../config";

const UserState = (props) => {
  const initialState = {
    user: {},
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);
  const { setAlert } = useContext(AlertContext);

  const logInAUser = async (login, password) => {
    await axios
      .post(`${Config.apiUrl}/api/auth/local`, {
        identifier: login,
        password: password,
      })
      .then((response) => {
        const { data } = response;

        const parsedUser = {
          ...data.user,
          role: data.user.inAppRole,
          jwt: data.jwt,
        };

        sessionStorage.setItem("user", JSON.stringify(parsedUser));

        dispatch({
          type: LOG_IN_USER,
          payload: parsedUser,
        });

        props.loginToggle(true);
      })
      .catch((error) => {
        const errorName = error.response.data.error.name;
        if (errorName === "ValidationError") {
          setAlert("Błędne dane logowania.");
        }
      });
  };

  const checkSession = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user !== null) {
      dispatch({
        type: LOG_IN_USER,
        payload: user,
      });
      props.loginToggle(true);
    }
  };

  const updateUserById = async (id) => {
    const res = await axios.get(`/users/${id}`);
    dispatch({
      type: LOG_IN_USER,
      payload: res.data,
    });
  };

  const updateUserById = async (id) => {
    const res = await axios.get(`/users/${id}`);
    dispatch({
      type: LOG_IN_USER,
      payload: res.data,
    });
  };

  const logout = () => {
    sessionStorage.removeItem("user");
    dispatch({
      type: USER_LOGOUT,
    });
    props.loginToggle(false);
  };

  const getRole = () => {
    switch (state.user.role) {
      case "admin":
        return "Administrator";
      case "user":
        return "Serwisant";
      case "customer":
        return "Klient";
      default:
        return "Role";
    }
  };

  const isCustomer = () => state.user.role === "customer";
  const isAdmin = () => state.user.role === "admin";

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        logInAUser,
        updateUserById,
        checkSession,
        getRole,
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
