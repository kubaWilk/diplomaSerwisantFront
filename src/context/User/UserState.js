import React, { useContext, useReducer } from "react";
import UserContext from "./UserContext";
import UserReducer from "./UserReducer";
import { LOG_IN_USER, USER_LOGOUT } from "../types";
import { NO_ACCOUNT, WRONG_PASSWORD } from "../../errorCodes";
import axios from "axios";
import AlertContext from "../Alert/AlertContext";
import Session from "react-session-api";

const UserState = (props) => {
  const initialState = {
    user: {},
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);
  const AlertContextObj = useContext(AlertContext);

  const logInAUser = (login, password) => {
    fetchUser(login, password).then((a) => {
      switch (a) {
        case WRONG_PASSWORD:
          AlertContextObj.setAlert("Nieprawidłowe hasło");
          break;
        case NO_ACCOUNT:
          AlertContextObj.setAlert("Nieprawidłowe dane logowania");
          break;
        default:
          //have no idea how to resolve it better
          sessionStorage.setItem("user", JSON.stringify(a));

          dispatch({
            type: LOG_IN_USER,
            payload: a,
          });
          props.loginToggle(true);
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

  const fetchUser = async (login, password) => {
    //TODO: Refactor after API's done

    //get all users
    const res = axios.get("/users");
    const users = (await res).data;

    let isPasswordWrong = false;
    let doesAccountExist = true;

    for (let i = 0; i < users.length; i++) {
      const user = users[i];

      if (login === user.userName) {
        if (password === user.password) {
          isPasswordWrong = false;
          doesAccountExist = true;
          return user;
        } else {
          isPasswordWrong = true;
        }
      } else {
        doesAccountExist = false;
      }
    }

    if (isPasswordWrong) return WRONG_PASSWORD;
    else if (!doesAccountExist) return NO_ACCOUNT;
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
  return (
    <UserContext.Provider
      value={{
        user: state.user,
        logInAUser,
        checkSession,
        getRole,
        logout,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
