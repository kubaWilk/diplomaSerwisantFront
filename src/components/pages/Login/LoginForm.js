import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertContext from "../../../context/Alert/AlertContext";
import UserContext from "../../../context/User/UserContext";
import Alert from "../../layout/Alert";

import axios from "axios";
import { Config } from "../../../config";

const LoginForm = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const { setAlert } = useContext(AlertContext);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(`${Config.apiUrl}/auth/login`, {
        username: login,
        password: password,
      })
      .then((response) => {
        setUser(response.data);
      })
      .then(navigate("/"))
      .catch((e) => {
        console.log(e);
        if (e.code === "ERR_NETWORK") setAlert("Błąd połączenia");
        if (e.response.status === 403)
          setAlert("Nieprawidłowe dane logowania!");
      });
  };

  return (
    <div className="p-4 border-2 mt-5">
      <form onSubmit={onSubmit} className="flex flex-col items-center">
        <div className="flex flex-col">
          <label htmlFor="login" className="text-xl p-1">
            Login
          </label>
          <input
            name="login"
            type="text"
            className="border-2 rounded-md p-1 w-[20rem]"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="text-xl p-1">
            Hasło
          </label>
          <input
            name="password"
            type="password"
            autoComplete="password"
            className="border-2 rounded-md p-1 w-[20rem]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Alert />
        <div className="mt-3">
          <button
            type="submit"
            className="p-2 mr-1 border-2 border-black font-bold hover:bg-black hover:text-white duration-100"
          >
            Zaloguj
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate("/reset-password");
            }}
            className="link-button"
          >
            Zapomniałem hasła
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
