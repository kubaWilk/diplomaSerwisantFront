import { SET_USER, USER_LOGOUT, SET_USERS, SET_CUSTOMER } from "../types";

const UserReducer = (state, action) => {
  switch (action.type) {
    case USER_LOGOUT:
      sessionStorage.removeItem("user");

      return {
        ...state,
        user: {},
      };
    case SET_USER:
      sessionStorage.setItem("user", JSON.stringify(action.payload));

      return {
        ...state,
        user: action.payload.user,
        authToken: action.payload.token,
      };
    case SET_CUSTOMER: {
      return { ...state, customer: action.payload };
    }
    case SET_USERS: {
      return { ...state, isLoading: false, users: action.payload };
    }
    default:
      return { ...state };
  }
};

export default UserReducer;
