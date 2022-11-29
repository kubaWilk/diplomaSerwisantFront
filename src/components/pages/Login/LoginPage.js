import React from "react";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <div>
      {/* Main Container */}
      <div className="flex flex-col items-center justify-center w-screen h-screen">
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
