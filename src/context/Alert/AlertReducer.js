import { SET_ALERT, REMOVE_ALERT } from "../types";

const AlertReducer = (state, action) => {
  switch (action.type) {
    case SET_ALERT:
      return {
        ...state,
        message: action.payload.message,
        color: action.payload.color,
      };
    case REMOVE_ALERT:
      return {
        ...state,
        message: "",
      };
    default:
      return { ...state };
  }
};

export default AlertReducer;
