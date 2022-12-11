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

  const postRepair = (id, customer, device, user, status) => {
    axios
      .post(`/repairs/${id}`, {
        id: id,
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
        removeRepair,
      }}
    >
      {props.children}
    </SingleRepairContext.Provider>
  );
};

export default SingleRepairState;
