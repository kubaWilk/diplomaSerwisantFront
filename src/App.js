import "./App.css";
import "./index.css";
import Navbar from "./components/layout/Navbar";
import SideMenu from "./components/layout/SideMenu";
import Repairs from "./components/pages/Repairs/Repairs";
import { Routes, Route } from "react-router-dom";
import UserState from "./context/User/UserState";
import LoginPage from "./components/pages/Login/LoginPage";
import { useEffect, useState } from "react";
import Customers from "./components/pages/Customers/Customers";
import Home from "./components/pages/Home/Home";
import Devices from "./components/pages/Devices/Devices";
import AdminPanel from "./components/pages/AdminPanel/AdminPanel";
import Repair from "./components/pages/Repairs/Repair/Repair";
import AddRepair from "./components/pages/Repairs/Add/AddRepair";
import EditRepair from "./components/pages/Repairs/Repair/EditRepair";
import Notes from "./components/pages/Repairs/Repair/Notes";

function App() {
  const [loginToggle, setLoginToggle] = useState(false);

  return (
    <UserState loginToggle={setLoginToggle}>
      {loginToggle ? (
        <div className="w-screen">
          <Navbar />
          <div className="flex screen-height">
            <SideMenu />
            <Routes>
              {/* Main route */}
              <Route exact path="/" element={<Home />} />
              {/* Repairs Routes */}
              <Route exact path="/repairs" element={<Repairs />} />
              <Route exact path="/repairs/:id" element={<Repair />} />
              <Route exact path="/repairs/:id/notes" element={<Notes />} />
              <Route exact path="/repairs/edit/:id" element={<EditRepair />} />
              <Route exact path="/repairs/new" element={<AddRepair />} />
              {/* Users Routes */}
              <Route exact path="/customers" element={<Customers />} />
              <Route exact path="/devices" element={<Devices />} />
              <Route exact path="/admin-panel" element={<AdminPanel />} />
            </Routes>
          </div>
        </div>
      ) : (
        <LoginPage />
      )}
    </UserState>
  );
}

export default App;
