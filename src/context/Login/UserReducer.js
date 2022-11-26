import { LOG_IN_USER, IS_USER_LOGGED_IN, USER_LOGOUT } from "../types";

const UserReducer = (state, action) => {
  switch (action.type) {
    case IS_USER_LOGGED_IN:
      return {
        ...state,
        isUserLoggedIn: true,
      };
    case USER_LOGOUT:
      return {
        ...state,
        user: {},
        isUserLoggedIn: false,
      };
    case LOG_IN_USER:
      return {
        ...state,
        user: action.payload,
        isUserLoggedIn: true,
      };
    default:
      return { ...state };
  }
};

export default UserReducer;
