import { useEffect, useReducer } from "react";
import RepairsContext from "./RepairsContext";
import RepairsReducer from "./RepairsReducer";
import { SET_REPAIRS, SET_REPAIR } from "../types";
import axios from "axios";

const RepairsState = (props) => {
  const initialState = {
    isLoading: true,
    isRepairLoading: true,
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

  const addRepair = (customer, device, user, status) => {
    alert("upload, ale z contextu");
  };

  return (
    <RepairsContext.Provider
      value={{
        allRepairs: state.allRepairs,
        isLoading: state.isLoading,
        isRepairLoading: state.isRepairLoading,
        repair: state.repair,
        fetchRepairs,
        fetchRepairById,
        addRepair,
      }}
    >
      {props.children}
    </RepairsContext.Provider>
  );
};

export default RepairsState;
