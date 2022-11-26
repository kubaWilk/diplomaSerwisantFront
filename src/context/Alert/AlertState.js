import React from "react";
import { useReducer } from "react";
import { REMOVE_ALERT, SET_ALERT } from "../types";
import AlertContext from "./AlertContext";
import AlertReducer from "./AlertReducer";

const AlertState = (props) => {
  const initialState = {
    message: "",
  };

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  const setAlert = (msg) => {
    dispatch({
      type: SET_ALERT,
      payload: msg,
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT }), 3000);
  };

  return (
    <AlertContext.Provider
      value={{
        message: state.message,
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
