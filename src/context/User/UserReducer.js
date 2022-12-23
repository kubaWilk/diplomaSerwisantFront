import { LOG_IN_USER, USER_LOGOUT } from "../types";

const UserReducer = (state, action) => {
  switch (action.type) {
    case USER_LOGOUT:
      return {
        ...state,
        user: {},
      };
    case LOG_IN_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return { ...state };
  }
};

export default UserReducer;
