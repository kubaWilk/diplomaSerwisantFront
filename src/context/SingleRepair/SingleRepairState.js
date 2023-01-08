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
    axios
      .post(`/repairs`, {
        status: status,
        device: device,
        customer: customer,
        user: user,
      })
      .catch((e) => console.log(e));
  };

  const putRepair = (id, customer, device, user, status) => {
    axios
      .put(`/repairs/${id}`, {
        id: id,
        status: status,
        device: device,
        customer: customer,
        user: user,
      })
      .catch((e) => console.log(e));
  };

  const postCostAccept = (id) => {
    //TODO: Check if bug (no repair state after refresh) persists after API's implemented
    axios
      .put(`/repairs/${id}`, {
        ...state.repair,
        costAccepted: true,
      })
      .catch((e) => console.log(e))
      .finally(fetchRepairById(id));
  };

  const removeRepair = (id) => {
    axios.delete(`/repairs/${id}`).catch((e) => console.log(e));
  };

  return (
    <SingleRepairContext.Provider
      value={{
        repair: state.repair,
        isLoading: state.isLoading,
        postRepair,
        putRepair,
        fetchRepairById,
        postCostAccept,
        removeRepair,
      }}
    >
      {props.children}
    </SingleRepairContext.Provider>
  );
};

export default SingleRepairState;
