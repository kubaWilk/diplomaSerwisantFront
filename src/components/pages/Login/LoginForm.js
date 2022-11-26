import React, { useContext, useState } from "react";
import AlertContext from "../../../context/Alert/AlertContext";
import UserContext from "../../../context/Login/UserContext";

const LoginForm = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const LoginContextObj = useContext(UserContext);
  const { message } = useContext(AlertContext);

  const onSubmit = (e) => {
    e.preventDefault();
    LoginContextObj.logInAUser(login, password);
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
            className="border-2 rounded-md p-1 w-[20rem]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mt-3 text-md font-bold text-red-600">{message}</div>
        <div className="mt-3">
          <button
            type="submit"
            className="p-2 border-2 border-black font-bold hover:bg-black hover:text-white duration-100"
          >
            Zaloguj
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
