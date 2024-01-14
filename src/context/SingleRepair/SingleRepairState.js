import React, { useReducer } from "react";
import axios from "axios";
import { SET_REPAIR, UPDATE_REPAIR } from "../types";
import SingleRepairReducer from "./SingleRepairReducer";
import SingleRepairContext from "./SingleRepairContext";
import { Config } from "../../config";

const SingleRepairState = (props) => {
  const initialState = {
    isLoading: true,
    repair: {},
  };

  const [state, dispatch] = useReducer(SingleRepairReducer, initialState);

  const setRepair = (repair) => {
    dispatch({
      type: SET_REPAIR,
      payload: repair,
    });
  };

  const postRepair = async (repair, token) => {
    return axios.post(
      `${Config.apiUrl}/repair/`,
      { ...repair },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  const postDevice = async (device, token) => {
    return axios
      .post(
        `${Config.apiUrl}/api/devices`,
        {
          data: {
            ...device,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        return res;
      });
  };

  const changeRepairStatus = async (id, status, token) => {
    await axios
      .put(
        `${Config.apiUrl}/repair/status`,
        {
          id: id,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((e) => console.log(e));
  };

  const postCostAccept = (id) => {
    //TODO: Check if bug (no repair state after refresh) persists after API's implemented
    axios
      .put(`/repairs/${id}`, {
        ...state.repair,
        costAccepted: true,
      })
      .catch((e) => console.log(e));
    // .finally(fetchRepairById(id));
  };

  const removeRepair = (id, token) => {
    return axios.delete(`${Config.apiUrl}/repair/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  return (
    <SingleRepairContext.Provider
      value={{
        repair: state.repair,
        isLoading: state.isLoading,
        setRepair,
        postRepair,
        postDevice,
        changeRepairStatus,
        postCostAccept,
        removeRepair,
      }}
    >
      {props.children}
    </SingleRepairContext.Provider>
  );
};

export default SingleRepairState;
