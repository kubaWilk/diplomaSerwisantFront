import { SET_REPAIR } from "../types";

const SingleRepairReducer = (state, action) => {
  switch (action.type) {
    case SET_REPAIR:
      return {
        ...state,
        repair: action.payload,
        isLoading: false,
      };
    default:
      return { ...state };
  }
};

export default SingleRepairReducer;
