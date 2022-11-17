import React, { useEffect } from "react";
import { useState } from "react";

const dummyUsers = [
  {
    id: 1,
    login: "admin",
    password: "admin",
  },
];

const status = {
  OK: "OK",
  NO_ACCOUNT: "NO_ACCOUNT",
  WRONG_PASSWORD: "WRONG_PASSWORD",
};

const errorMessages = {
  NO_ACCOUNT: "Nieprawidłowe dane logowania",
  WRONG_PASSWORD: "Nieprawidłowe hasło",
};

const Login = ({ userToggle, userInfoSetter }) => {
  const [userLogin, setUserLogin] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(errorMessages.NO_ACCOUNT);
  const [isErrorOn, setIsErrorOn] = useState(false);
  const errorTimeout = 6000;

  const handleSubmit = (event) => {
    event.preventDefault();
    switch (authorizeUser()) {
      case status.OK:
        userToggle(true);
        break;
      case status.WRONG_PASSWORD:
        showLoginError(errorMessages.WRONG_PASSWORD);
        break;
      case status.NO_ACCOUNT:
        showLoginError(errorMessages.NO_ACCOUNT);
        break;
      default:
        console.log("Something went wrong");
        break;
    }
  };

  //TODO: Refactor it to use exceptions
  const authorizeUser = () => {
    for (let i = 0; i < dummyUsers.length; i++) {
      const user = dummyUsers[i];
      if (userLogin === user.login) {
        if (userPassword === user.password) {
          userInfoSetter(user);
          return status.OK;
        } else return status.WRONG_PASSWORD;
      } else return status.NO_ACCOUNT;
    }
  };

  const showLoginError = (msg) => {
    setErrorMsg(msg);
    setIsErrorOn(true);
    setTimeout(() => setIsErrorOn(false), errorTimeout);
  };

  return (
    <div id="login-page">
      <h1>SerwisantPRO</h1>
      <div className="login-rect">
        <form className="login-form">
          <label htmlFor="userLogin">Login:</label>
          <input
            name="userLogin"
            type="text"
            value={userLogin}
            onChange={(event) => {
              setUserLogin(event.target.value);
            }}
          />
          <label htmlFor="userPassword">Hasło:</label>
          <input
            name="userPassword"
            type="password"
            value={userPassword}
            onChange={(event) => {
              setUserPassword(event.target.value);
            }}
          />
          {isErrorOn && <p className="error-message">{errorMsg}</p>}
          <button type="submit" className="btn" onClick={handleSubmit}>
            Zaloguj
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
