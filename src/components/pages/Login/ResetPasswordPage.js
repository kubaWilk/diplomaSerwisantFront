import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AlertContext from "../../../context/Alert/AlertContext";
import Alert from "../../layout/Alert";

import axios from "axios";
import { Config } from "../../../config";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2Try, setNewPassword2Try] = useState("");

  const { setAlert } = useContext(AlertContext);
  const { token } = useParams();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (token !== undefined) {
      resetPassword();
    } else {
      await requestToken();
    }
  };

  const requestToken = async () => {
    await axios
      .post(`${Config.apiUrl}/auth/reset/request`, {
        email: email,
      })
      .then(() => {
        setAlert("Mail z resetem hasła wysłany!", "green");
        navigate("/");
      })
      .catch((e) => {
        if (e.code === "ERR_NETWORK") setAlert("Błąd połączenia");
        if (e.code === "ERR_BAD_REQUEST")
          setAlert("Nie znaleziono użytkownika z podanym adresem e-mail!");
      });
  };

  const resetPassword = async () => {
    await axios
      .post(`${Config.apiUrl}/auth/reset?token=${token}`, {
        firstPassword: newPassword,
        secondPassword: newPassword2Try,
      })
      .then((res) => {
        setAlert("Hasło zmienione.");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch((e) => console.log(e));
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
              {token === undefined && (
                <>
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
                </>
              )}
              {token !== undefined && (
                <>
                  <label htmlFor="login" className="text-xl p-1">
                    Nowe hasło
                  </label>
                  <input
                    name="newPassword"
                    type="password"
                    className="border-2 rounded-md p-1 w-[20rem]"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <label htmlFor="login" className="text-xl p-1">
                    Powtórz hasło
                  </label>
                  <input
                    name="newPassword2Try"
                    type="password"
                    className="border-2 rounded-md p-1 w-[20rem]"
                    value={newPassword2Try}
                    onChange={(e) => setNewPassword2Try(e.target.value)}
                  />
                </>
              )}
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
