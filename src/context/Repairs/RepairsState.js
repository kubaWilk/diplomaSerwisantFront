import { useReducer } from "react";
import RepairsContext from "./RepairsContext";
import RepairsReducer from "./RepairsReducer";
import { SET_REPAIRS } from "../types";
import axios from "axios";
import { Config } from "../../config";

const RepairsState = (props) => {
  const initialState = {
    isLoading: true,
    isRepairLoading: true,
    allRepairs: {},
  };

  const [state, dispatch] = useReducer(RepairsReducer, initialState);

  const setRepairs = (data) => {
    dispatch({
      type: SET_REPAIRS,
      payload: data,
    });
  };

  const searchRepairs = async (apiString) => {
    const repairs = await axios.get(`/repairs/${apiString}`);

    dispatch({
      type: SET_REPAIRS,
      payload: repairs.data,
    });
  };

  return (
    <RepairsContext.Provider
      value={{
        allRepairs: state.allRepairs,
        isLoading: state.isLoading,
        // fetchRepairs,
        setRepairs,
        searchRepairs,
      }}
    >
      {props.children}
    </RepairsContext.Provider>
  );
};

export default RepairsState;
