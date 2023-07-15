import { SET_ALERT, REMOVE_ALERT } from "../types";

const AlertReducer = (state, action) => {
  switch (action.type) {
    case SET_ALERT:
      return {
        message: action.payload,
      };
    case REMOVE_ALERT:
      return {
        message: "",
      };
    default:
      return { ...state };
  }
};

export default AlertReducer;
