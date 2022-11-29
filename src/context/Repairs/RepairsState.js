import { useEffect, useReducer } from "react";
import RepairsContext from "./RepairsContext";
import RepairsReducer from "./RepairsReducer";
import { SET_REPAIRS, SET_REPAIR } from "../types";
import axios from "axios";

const RepairsState = (props) => {
  const initialState = {
    isLoading: true,
    allRepairs: {},
    repair: {},
  };

  const [state, dispatch] = useReducer(RepairsReducer, initialState);

  const fetchRepairs = async () => {
    const repairs = await axios.get("/repairs");

    dispatch({
      type: SET_REPAIRS,
      payload: repairs.data,
    });
  };

  const fetchRepairById = async (id) => {
    const repair = await axios.get(`/repairs/${id}`);

    dispatch({
      type: SET_REPAIR,
      payload: repair.data,
    });
  };

  return (
    <RepairsContext.Provider
      value={{
        allRepairs: state.allRepairs,
        isLoading: state.isLoading,
        repair: state.repair,
        fetchRepairs,
        fetchRepairById,
      }}
    >
      {props.children}
    </RepairsContext.Provider>
  );
};

export default RepairsState;
