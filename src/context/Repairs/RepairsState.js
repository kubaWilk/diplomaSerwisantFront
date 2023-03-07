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

  const fetchRepairs = async (token) => {
    await axios
      .get(`${Config.apiUrl}/api/repairs?populate=*`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch({
          type: SET_REPAIRS,
          payload: res.data,
        });
      })
      .catch((error) => console.log("UserState/fetchCustomers", error));
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
