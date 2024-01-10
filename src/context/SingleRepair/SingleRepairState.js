import React, { useReducer } from "react";
import axios from "axios";
import { SET_REPAIR, UPDATE_REPAIR } from "../types";
import SingleRepairReducer from "./SingleRepairReducer";
import SingleRepairContext from "./SingleRepairContext";
import { Config } from "../../config";
import { useNavigate } from "react-router-dom";

const SingleRepairState = (props) => {
  const initialState = {
    isLoading: true,
    repair: {},
  };

  const [state, dispatch] = useReducer(SingleRepairReducer, initialState);
  const navigate = useNavigate();

  const fetchRepairById = async (id, token) => {
    return await axios
      .get(`${Config.apiUrl}/repair/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) =>
        dispatch({
          type: SET_REPAIR,
          payload: res.data,
        })
      );
  };

  const postRepair = (repair, token) => {
    if (repair.photos !== null) {
      return axios
        .post(`${Config.apiUrl}/api/upload`, repair.photos, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((e) => {
          const fileIDs = [];
          e.data.forEach((file) => fileIDs.push(file.id));

          return axios.post(
            `${Config.apiUrl}/api/repairs`,
            {
              data: { ...repair, photos: fileIDs },
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        })
        .catch((e) => console.log(e));
    }

    return axios.post(
      `${Config.apiUrl}/api/repairs`,
      {
        data: repair,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
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

  const putRepair = (id, status, token) => {
    axios
      .put(
        `${Config.apiUrl}/api/repairs/${id}`,
        {
          data: {
            status: status,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) =>
        dispatch({
          type: UPDATE_REPAIR,
          payload: res.data.data.attributes.status,
        })
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
      .catch((e) => console.log(e))
      .finally(fetchRepairById(id));
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
        postRepair,
        postDevice,
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
