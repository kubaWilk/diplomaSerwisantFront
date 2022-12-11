import { SET_REPAIRS } from "../types";

const RepairsReducer = (state, action) => {
  switch (action.type) {
    case SET_REPAIRS:
      return {
        ...state,
        allRepairs: action.payload,
        isLoading: false,
      };
    default:
      return { ...state };
  }
};

export default RepairsReducer;
