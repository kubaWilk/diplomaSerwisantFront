import React from "react";
import { useReducer } from "react";
import { REMOVE_ALERT, SET_ALERT } from "../types";
import AlertContext from "./AlertContext";
import AlertReducer from "./AlertReducer";

const AlertState = (props) => {
  const initialState = {
    message: "",
    color: "",
  };

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  const setAlert = (msg, color) => {
    if (color === undefined) {
      color = "red";
    }

    dispatch({
      type: SET_ALERT,
      payload: { message: msg, color: color },
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT }), 3000);
  };

  return (
    <AlertContext.Provider
      value={{
        message: state.message,
        color: state.color,
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
