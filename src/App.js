import "./App.css";
import "./index.css";
import { useContext } from "react";
import UserContext from "./context/User/UserContext";
import LoginPage from "./components/pages/Login/LoginPage";
import DashRouter from "./components/DashRouter";
import ResetPaswordPage from "./components/pages/Login/ResetPasswordPage";
import { Routes, Route } from "react-router-dom";

function App() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <>
      <Routes>
        <Route index element={isLoggedIn() ? <DashRouter /> : <LoginPage />} />
        <Route exact path="/reset-password" element={<ResetPaswordPage />} />
      </Routes>
    </>
  );
}

export default App;
