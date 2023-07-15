import React, { useReducer } from "react";
import axios from "axios";
import {
  SET_REPAIR,
  UPDATE_REPAIR_STATUS,
  UPDATE_REPAIR_COST_ACCEPTED,
} from "../types";
import SingleRepairReducer from "./SingleRepairReducer";
import SingleRepairContext from "./SingleRepairContext";
import { Config } from "../../config";

const SingleRepairState = (props) => {
  const initialState = {
    isLoading: true,
    repair: {},
  };

  const [state, dispatch] = useReducer(SingleRepairReducer, initialState);

  const fetchRepairById = async (id, token) => {
    return await axios
      .get(`${Config.apiUrl}/api/repairs/${id}?populate=*`, {
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

  const changeRepairStatus = (id, status, token) => {
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
          type: UPDATE_REPAIR_STATUS,
          payload: res.data.data.attributes.status,
        })
      )
      .catch((e) => console.log(e));
  };

  const postCostAccept = (id, isCostAccepted, token) => {
    return axios
      .put(
        `${Config.apiUrl}/api/repairs/${id}`,
        {
          data: {
            costAccepted: isCostAccepted,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        dispatch({
          type: UPDATE_REPAIR_COST_ACCEPTED,
          payload: res.data.data.attributes.costAccepted,
        });
      });
  };

  const removeRepair = (id, token) => {
    axios
      .delete(`${Config.apiUrl}/api/repairs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .catch((e) => console.log(e));
  };

  return (
    <SingleRepairContext.Provider
      value={{
        repair: state.repair,
        isLoading: state.isLoading,
        postRepair,
        postDevice,
        putRepair: changeRepairStatus,
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
