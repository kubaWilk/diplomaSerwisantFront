import React from "react";
import { useReducer } from "react";
import LoginContext from "./LoginContext";
import LoginReducer from "./LoginReducer";
import { IS_USER_LOGGED_IN, LOG_IN_USER } from "../types";

const LoginState = (props) => {
  const initialState = {
    user: {},
    isUserLoggedIn: false,
  };

  const [state, dispatch] = useReducer(LoginReducer, initialState);

  const setIsUserLoggedIn = () => {
    dispatch({
      type: IS_USER_LOGGED_IN,
      payload: props.loginToggle,
    });
  };

  const logInAUser = (login, password) => {
    dispatch({
      type: LOG_IN_USER,
      payload: { login, password },
    });
    props.loginToggle(true);
  };

  return (
    <LoginContext.Provider
      value={{
        isUserLoggedIn: state.isUserLoggedIn,
        setIsUserLoggedIn,
        logInAUser,
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginState;
