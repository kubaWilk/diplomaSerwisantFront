import { SET_REPAIR, UPDATE_REPAIR } from "../types";
import { Config } from "../../config";

const SingleRepairReducer = (state, action) => {
  switch (action.type) {
    case SET_REPAIR:
      const parsedPhotos =
        action.payload.photos.data !== null
          ? action.payload.photos.data.map((item) => ({
              original: Config.apiUrl + item.attributes.url,
            }))
          : undefined;

      return {
        ...state,
        repair: { ...action.payload, photos: parsedPhotos },
        isLoading: false,
      };
    case UPDATE_REPAIR:
      return {
        ...state,
        repair: { ...state.repair, status: action.payload },
      };
    default:
      return { ...state };
  }
};

export default SingleRepairReducer;
