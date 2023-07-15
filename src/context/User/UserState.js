import React, { useReducer } from "react";
import axios from "axios";
import UserContext from "./UserContext";
import UserReducer from "./UserReducer";
import { Config } from "../../config";
import { SUCCESS } from "../../statusCodes";
import { SET_USER, USER_LOGOUT, SET_USERS, SET_CUSTOMER } from "../types";
import { parseUserData, parseCustomerData } from "../../Utils";

const UserState = (props) => {
  const initialState = {
    isLoading: true,
    user: {},
    users: {},
    customer: {},
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  const parseAndDispatchUser = (data, jwt) => {
    const parsedUser = parseUserData(data, jwt);
    sessionStorage.setItem("user", JSON.stringify(parsedUser));

    dispatch({
      type: SET_USER,
      payload: parsedUser,
    });

    return parsedUser;
  };

  const checkSession = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user !== null) {
      dispatch({
        type: SET_USER,
        payload: user,
      });
    }
  };

  const logout = () => {
    sessionStorage.removeItem("user");
    dispatch({
      type: USER_LOGOUT,
    });
  };

  const getRole = () => {
    switch (state.user.role) {
      case "admin":
        return "Administrator";
      case "user":
        return "Serwisant";
      case "customer":
        return "Klient";
      default:
        return "Role";
    }
  };

  const isCustomer = () => state.user.role === "customer";
  const isAdmin = () => state.user.role === "admin";

  const getCustomers = async (jwt) => {
    let token = jwt !== undefined ? jwt : state.user.jwt;
    await axios
      .get(`${Config.apiUrl}/api/users/?filters[inAppRole][$eq]=customer`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) =>
        dispatch({
          type: SET_USERS,
          payload: res.data,
        })
      )
      .catch((error) => console.log("UserState/fetchCustomers", error));
  };

  const getUsers = async () => {
    await axios
      .get(`${Config.apiUrl}/api/users/`, {
        headers: {
          Authorization: `Bearer ${state.user.jwt}`,
        },
      })
      .then((res) =>
        dispatch({
          type: SET_USERS,
          payload: res.data,
        })
      )
      .catch((error) => console.log("UserState/fetchUsers", error));
  };

  const getUserById = async (id) => {
    let isSuccess = false;
    await axios
      .get(`${Config.apiUrl}/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${state.user.jwt}`,
        },
      })
      .then((res) => {
        dispatch({ type: SET_CUSTOMER, payload: parseCustomerData(res.data) });
        isSuccess = parseCustomerData(res.data);
      })
      .catch((error) => {
        console.log("SingleUser/fetchUser", error);
        isSuccess = false;
      });

    return isSuccess;
  };

  const postLogIn = async (login, password) => {
    return await axios
      .post(
        `${Config.apiUrl}/api/auth/local`,
        {
          identifier: login,
          password: password,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        const tempUser = parseAndDispatchUser(response.data);
        getCustomers(tempUser.jwt);
        return true;
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data.error.name === "ValidationError") {
          return false;
        } else {
          console.log(error);
        }
      });
  };

  const postUser = async (userData, role) => {
    const roles = {
      admin: 3,
      user: 4,
      customer: 5,
    };

    return axios
      .post(
        `${Config.apiUrl}/api/custom-user/register`,
        {
          ...userData,
          email: userData.eMail,
          inAppRole: role,
          role: roles[role],
          provider: "local",
        },
        { headers: { Authorization: `Bearer ${state.user.jwt}` } }
      )
      .then((res) => {
        return res;
      });
  };

  const putUserById = async (id, updateData) => {
    await axios
      .put(`${Config.apiUrl}/api/users/${id}`, updateData, {
        headers: {
          Authorization: `Bearer ${state.user.jwt}`,
        },
      })
      .then((res) => {
        if (id !== state.user.id) {
          dispatch({
            type: SET_CUSTOMER,
            payload: parseCustomerData(res.data),
          });
        } else {
          const { firstName, lastName, phoneNumber, street, postCode, city } =
            res.data;

          dispatch({
            type: SET_USER,
            payload: {
              firstName,
              lastName,
              phoneNumber,
              street,
              postCode,
              city,
            },
          });
        }
        return SUCCESS;
      })
      .catch((e) => console.log(e));
  };

  const changePassword = async (userCurrentPassword, userNewPassword) => {
    return await axios.post(
      `${Config.apiUrl}/api/auth/change-password`,
      {
        currentPassword: userCurrentPassword,
        password: userNewPassword,
        passwordConfirmation: userNewPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${state.user.jwt}`,
        },
      }
    );
  };

  const deleteUser = async (id) => {
    return await axios.delete(`${Config.apiUrl}/api/custom-user/${id}`, {
      headers: { Authorization: `Bearer ${state.user.jwt}` },
    });
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        users: state.users,
        isLoading: state.isLoading,
        checkSession,
        getRole,
        logout,
        isCustomer,
        isAdmin,
        getCustomers,
        getUsers,
        getUserById,
        postLogIn,
        postUser,
        putUserById,
        changePassword,
        deleteUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
