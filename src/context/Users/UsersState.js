import axios from "axios";
import React, { useReducer } from "react";
import Users from "../../components/pages/Users/Users";
import { SET_USERS } from "../types";
import UsersContext from "./UsersContext";
import UsersReducer from "./UsersReducer";

const UsersState = (props) => {
  const initialState = {
    isLoading: true,
    users: {},
  };

  const [state, dispatch] = useReducer(UsersReducer, initialState);

  const fetchUsers = async () => {
    const res = await axios.get("/users");

    dispatch({
      type: SET_USERS,
      payload: res.data,
    });
  };

  const fetchCustomers = async () => {
    const res = await axios.get("/users?role=customer");

    dispatch({
      type: SET_USERS,
      payload: res.data,
    });
  };

  return (
    <UsersContext.Provider
      value={{
        isLoading: state.isLoading,
        users: state.users,
        fetchUsers,
        fetchCustomers,
      }}
    >
      {props.children}
    </UsersContext.Provider>
  );
};

export default UsersState;
