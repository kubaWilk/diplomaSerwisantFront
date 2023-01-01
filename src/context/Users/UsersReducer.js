import { SET_USERS } from "../types";

const UsersReducer = (state, action) => {
  switch (action.type) {
    case SET_USERS: {
      return { ...state, isLoading: false, users: action.payload };
    }
    default:
      return { ...state };
  }
};

export default UsersReducer;
