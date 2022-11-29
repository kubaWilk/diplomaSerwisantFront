import { SET_REPAIRS, SET_REPAIR } from "../types";

const RepairsReducer = (state, action) => {
  switch (action.type) {
    case SET_REPAIRS:
      return {
        ...state,
        isLoading: false,
        allRepairs: action.payload,
      };
    case SET_REPAIR:
      return {
        ...state,
        isLoading: false,
        repair: action.payload,
      };
    default:
      return { ...state };
  }
};

export default RepairsReducer;
