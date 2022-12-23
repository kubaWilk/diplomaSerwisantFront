import { useReducer } from "react";
import RepairsContext from "./RepairsContext";
import RepairsReducer from "./RepairsReducer";
import { SET_REPAIRS } from "../types";
import axios from "axios";

const RepairsState = (props) => {
  const initialState = {
    isLoading: true,
    isRepairLoading: true,
    allRepairs: {},
  };

  const [state, dispatch] = useReducer(RepairsReducer, initialState);

  const fetchRepairs = async () => {
    const repairs = await axios.get("/repairs");

    dispatch({
      type: SET_REPAIRS,
      payload: repairs.data,
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
        fetchRepairs,
        searchRepairs,
      }}
    >
      {props.children}
    </RepairsContext.Provider>
  );
};

export default RepairsState;
