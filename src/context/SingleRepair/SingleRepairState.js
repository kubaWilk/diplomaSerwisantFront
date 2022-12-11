import React, { useReducer } from "react";
import axios from "axios";
import { SET_REPAIR } from "../types";
import SingleRepairReducer from "./SingleRepairReducer";
import SingleRepairContext from "./SingleRepairContext";

const SingleRepairState = (props) => {
  const initialState = {
    isLoading: true,
    repair: {},
  };

  const [state, dispatch] = useReducer(SingleRepairReducer, initialState);

  const fetchRepairById = async (id) => {
    const repair = await axios.get(`/repairs/${id}`);

    dispatch({
      type: SET_REPAIR,
      payload: repair.data,
    });
  };

  const postRepair = (customer, device, user, status) => {
    alert("upload, ale z contextu");
  };

  const patchRepair = (customer, device, user, status) => {
    alert("upload, ale z contextu");
  };

  return (
    <SingleRepairContext.Provider
      value={{
        repair: state.repair,
        isLoading: state.isLoading,
        postRepair,
        patchRepair,
        fetchRepairById,
      }}
    >
      {props.children}
    </SingleRepairContext.Provider>
  );
};

export default SingleRepairState;
