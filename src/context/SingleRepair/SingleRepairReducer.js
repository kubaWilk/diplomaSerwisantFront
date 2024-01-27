import { SET_REPAIR, UPDATE_REPAIR } from "../types";

const SingleRepairReducer = (state, action) => {
  switch (action.type) {
    case SET_REPAIR:
      return {
        ...state,
        repair: {
          customer: {
            ...action.payload.issuer,
            ...action.payload.issuer.userInfo,
          },
          device: { ...action.payload.device },
          description: action.payload.description,
          costAccepted: action.payload.costAccepted,
          status: action.payload.repairStatus,
        },
        isLoading: false,
      };
    case UPDATE_REPAIR:
      return {
        ...state,
        repair: {
          ...state.repair,
          status: action.payload,
        },
      };
    default:
      return { ...state };
  }
};

export default SingleRepairReducer;
