import React from "react";
import { useState } from "react";

const Login = ({ userToggle, userInfoSetter }) => {
  const [userLogin, setUserLogin] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    userToggle(true);
  };

  return (
    <div id="login-page">
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
          <button type="submit" className="btn" onClick={handleSubmit}>
            Zaloguj
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
