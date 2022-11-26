import React, { useContext, useReducer } from "react";
import UserContext from "./UserContext";
import UserReducer from "./UserReducer";
import { IS_USER_LOGGED_IN, LOG_IN_USER, USER_LOGOUT } from "../types";
import { NO_ACCOUNT, WRONG_PASSWORD } from "../../errorCodes";
import axios from "axios";
import AlertContext from "../Alert/AlertContext";

const UserState = (props) => {
  const initialState = {
    user: {},
    isUserLoggedIn: false,
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);
  const AlertContextObj = useContext(AlertContext);

  const setIsUserLoggedIn = () => {
    dispatch({
      type: IS_USER_LOGGED_IN,
      payload: props.loginToggle,
    });
  };

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
          dispatch({
            type: LOG_IN_USER,
            payload: a,
          });
          props.loginToggle(true);
      }
    });
  };

  const fetchUser = async (login, password) => {
    //TODO: Refactor after API's done

    //get all users
    const res = axios.get("/users");
    const users = (await res).data;

    for (let i = 0; i < users.length; i++) {
      const user = users[i];

      if (login === user.userName) {
        if (password === user.password) {
          return user;
        } else {
          return WRONG_PASSWORD;
        }
      } else {
        return NO_ACCOUNT;
      }
    }
  };

  const logout = () => {
    dispatch({
      type: USER_LOGOUT,
    });
    props.loginToggle(false);
  };

  return (
    <UserContext.Provider
      value={{
        isUserLoggedIn: state.isUserLoggedIn,
        setIsUserLoggedIn,
        logInAUser,
        logout,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
