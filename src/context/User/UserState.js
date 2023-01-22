import React, { useContext, useReducer } from "react";
import axios from "axios";
import UserContext from "./UserContext";
import UserReducer from "./UserReducer";
import AlertContext from "../Alert/AlertContext";
import { Config } from "../../config";
import { SUCCESS } from "../../statusCodes";
import { LOG_IN_USER, USER_LOGOUT } from "../types";

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
        setUser(response.data);
        props.loginToggle(true);
      })
      .catch((error) => {
        const errorName = error.response.data.error.name;
        if (errorName === "ValidationError") {
          setAlert("Błędne dane logowania.");
        }
      });
  };

  const setUser = (data, jwt) => {
    const parsedUser = parseUserData(data, jwt);
    sessionStorage.setItem("user", JSON.stringify(parsedUser));

    dispatch({
      type: LOG_IN_USER,
      payload: parsedUser,
    });
  };

  const parseUserData = (data, jwt) => {
    if (jwt === undefined) {
      return {
        ...data.user,
        role: data.user.inAppRole,
        jwt: data.jwt,
      };
    } else
      return {
        ...data,
        role: data.inAppRole,
        jwt: jwt,
      };
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

  const updateUser = async (userState, updateData) => {
    const result = await axios
      .put(`${Config.apiUrl}/api/users/${userState.id}`, updateData, {
        headers: {
          Authorization: `Bearer ${userState.jwt}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUser(res.data, userState.jwt);
        return SUCCESS;
      })
      .catch((e) => console.log(e));

    return result;
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
        updateUser,
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
