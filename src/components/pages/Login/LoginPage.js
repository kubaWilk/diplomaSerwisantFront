import React from "react";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <div>
      {/* Main Container */}
      <div className="container flex flex-col items-center justify-center h-screen">
        {/* Logo Container */}
        <div>
          <h1 className="text-6xl font-bold">SerwisantPC</h1>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
