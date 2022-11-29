import { SET_REPAIRS, SET_REPAIR } from "../types";

const RepairsReducer = (state, action) => {
  switch (action.type) {
    case SET_REPAIRS:
      return {
        ...state,
        allRepairs: action.payload,
        isLoading: false,
      };
    case SET_REPAIR:
      return {
        ...state,
        repair: action.payload,
        isRepairLoading: false,
      };
    default:
      return { ...state };
  }
};

export default RepairsReducer;
