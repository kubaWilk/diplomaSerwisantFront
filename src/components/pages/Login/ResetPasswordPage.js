import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertContext from "../../../context/Alert/AlertContext";
import Alert from "../../layout/Alert";

import axios from "axios";
import { Config } from "../../../config";

const LoginForm = () => {
  const [email, setEmail] = useState("");

  const { setAlert } = useContext(AlertContext);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(`${Config.apiUrl}/auth/reset/request`, {
        email: email,
      })
      .then(() => {
        setAlert("Mail z resetem hasła wysłany!", "green");
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
        if (e.code === "ERR_NETWORK") setAlert("Błąd połączenia");
        if (e.code === "ERR_BAD_REQUEST")
          setAlert("Nie znaleziono użytkownika z podanym adresem e-mail!");
      });
  };

  return (
    <div>
      {/* Main Container */}
      <div className="flex flex-col items-center justify-center w-screen h-screen">
        {/* Logo Container */}
        <div>
          <h1 className="text-6xl font-bold">SerwisantPC</h1>
        </div>
        <div className="p-4 border-2 mt-5">
          <form onSubmit={onSubmit} className="flex flex-col items-center">
            <div className="flex flex-col">
              <label htmlFor="login" className="text-xl p-1">
                Adres E-Mail
              </label>
              <input
                name="email"
                type="text"
                className="border-2 rounded-md p-1 w-[20rem]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <Alert />
            <div className="mt-3">
              <button
                type="submit"
                className="p-2 mr-1 border-2 border-black font-bold hover:bg-black hover:text-white duration-100"
              >
                Wyślij
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
