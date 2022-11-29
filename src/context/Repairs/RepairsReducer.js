import { SET_REPAIRS } from "../types";

const RepairsReducer = (state, action) => {
  switch (action.type) {
    case SET_REPAIRS:
      return {
        ...state,
        isLoading: false,
        allRepairs: action.payload,
      };
    default:
      return { ...state };
  }
};

export default RepairsReducer;
