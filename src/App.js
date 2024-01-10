import "./App.css";
import "./index.css";
import { useContext } from "react";
import UserContext from "./context/User/UserContext";
import LoginPage from "./components/pages/Login/LoginPage";
import DashRouter from "./components/DashRouter";
import ResetPaswordPage from "./components/pages/Login/ResetPasswordPage";
import { Routes, Route } from "react-router-dom";
import Repair from "./components/pages/Repairs/Repair/Repair";
import Repairs from "./components/pages/Repairs/Repairs";
import RepairsList from "./components/pages/Repairs/RepairsList";
import Notes from "./components/pages/Repairs/Repair/Notes";
import Cost from "./components/pages/Repairs/Repair/Cost/Cost";
import Photos from "./components/pages/Repairs/Repair/Photos";
import EditRepair from "./components/pages/Repairs/Repair/EditRepair";
import AddRepair from "./components/pages/Repairs/Add/AddRepair";
import DashContainer from "./components/DashContainer";
import Home from "./components/pages/Home/Home";
import ErrorPage from "./components/pages/ErrorPage";

function App() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <>
      <Routes>
        <Route exact path="/reset-password" element={<ResetPaswordPage />} />
        <Route index element={isLoggedIn() ? <DashRouter /> : <LoginPage />} />

        {/* Repairs Routes */}
        <Route exact path="/app" element={<DashContainer />}>
          <Route exact path="/app/error" element={<ErrorPage />} />
          <Route exact path="/app/home" element={<Home />} />
          <Route path="/app/repairs" element={<Repairs />}>
            <Route exact path="/app/repairs/all" element={<RepairsList />} />
            <Route exact path="/app/repairs/:id" element={<Repair />} />
            <Route exact path="/app/repairs/:id/notes" element={<Notes />} />
            <Route exact path="/app/repairs/:id/cost" element={<Cost />} />
            <Route exact path="/app/repairs/:id/photos" element={<Photos />} />
            <Route
              exact
              path="/app/repairs/edit/:id"
              element={<EditRepair />}
            />
            <Route exact path="/app/repairs/new" element={<AddRepair />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
