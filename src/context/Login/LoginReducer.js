import { LOG_IN_USER, IS_USER_LOGGED_IN } from "../types";

const LoginReducer = (state, action) => {
  switch (action.type) {
    case IS_USER_LOGGED_IN:
      return {
        ...state,
        isUserLoggedIn: true,
      };

    default:
      return { ...state };
  }
};

export default LoginReducer;
