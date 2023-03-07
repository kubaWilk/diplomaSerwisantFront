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

  const setUser = (data, jwt) => {
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
    let isSuccess = false;
    await axios
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
        const tempUser = setUser(response.data);
        getCustomers(tempUser.jwt);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data.error.name === "ValidationError") {
          isSuccess = false;
        } else {
          console.log(error);
        }
      });

    return Promise.resolve(isSuccess);
  };

  const postUser = async (userData, role) => {
    const roles = {
      super_admin: 3,
      user: 4,
      customer: 5,
    };

    let generatedUsername = await generateUsername("jakub.wilk");

    return axios
      .post(
        `${Config.apiUrl}/api/users`,
        {
          ...userData,
          username: generatedUsername,
          email: userData.eMail,
          password: "abcde!@#1A111111",
          inAppRole: role,
          role: roles[role],
          confirmed: true,
        },
        { headers: { Authorization: `Bearer ${state.user.jwt}` } }
      )
      .then((res) => {
        return res;
      });
  };

  const generateUsername = (username) => {
    const splitUsername = username.trim().split(" ");
    let output = "";

    splitUsername.forEach((element) => {
      output = output + element;
    });

    return checkIfUserExist(splitUsername).then((doesUserExist) => {
      if (doesUserExist) {
        let tempUserName = output.split(".");

        if (tempUserName.length < 3) {
          return generateUsername(`${tempUserName[0]}.a.${tempUserName[1]}`);
        }

        return generateUsername(
          `${tempUserName[0]}.${tempUserName[1] + "a"}.${tempUserName[2]}`
        );
      } else {
        return output;
      }
    });
  };

  const checkIfUserExist = async (username) => {
    return axios
      .get(`${Config.apiUrl}/api/users?filters[username][$eq]=${username}`, {
        headers: { Authorization: `Bearer ${state.user.jwt}` },
      })
      .then((e) => {
        if (e.data.length > 0) return true;
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
          setUser(res.data);
        }
        return SUCCESS;
      })
      .catch((e) => console.log(e));
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
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
