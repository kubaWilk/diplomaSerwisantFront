import "./App.css";
import "./index.css";
import Navbar from "./components/layout/Navbar";
import SideMenu from "./components/layout/SideMenu";
import Repairs from "./components/pages/Repairs/Repairs";
import { Routes, Route } from "react-router-dom";
import UserState from "./context/User/UserState";
import LoginPage from "./components/pages/Login/LoginPage";
import { useState } from "react";
import Users from "./components/pages/Users/Users";
import Home from "./components/pages/Home/Home";
import Devices from "./components/pages/Devices/Devices";
import AdminPanel from "./components/pages/AdminPanel/AdminPanel";
import Repair from "./components/pages/Repairs/Repair/Repair";
import AddRepair from "./components/pages/Repairs/Add/AddRepair";
import EditRepair from "./components/pages/Repairs/Repair/EditRepair";
import Notes from "./components/pages/Repairs/Repair/Notes";
import Cost from "./components/pages/Repairs/Repair/Cost/Cost";
import SingleUser from "./components/pages/Users/SingleUser/SingleUser";
import UserSummary from "./components/pages/Users/SingleUser/UserSummary";
import UserRepairs from "./components/pages/Users/SingleUser/UserRepairs";
import UserDevices from "./components/pages/Users/SingleUser/UserDevices";
import EditUser from "./components/pages/Users/SingleUser/EditUser";
import SingleDevice from "./components/pages/Devices/SingleDevice/SingleDevice";
import DevicesTable from "./components/pages/Devices/DevicesTable";

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
              <Route index element={<Home />} />
              {/* Repairs Routes */}
              <Route exact path="/repairs" element={<Repairs />} />
              <Route exact path="/repairs/:id" element={<Repair />} />
              <Route exact path="/repairs/:id/notes" element={<Notes />} />
              <Route exact path="/repairs/:id/cost" element={<Cost />} />
              <Route exact path="/repairs/edit/:id" element={<EditRepair />} />
              <Route exact path="/repairs/new" element={<AddRepair />} />
              {/* Users Routes */}
              <Route exact path="/users" element={<Users />} />
              <Route exact path="/user/" element={<SingleUser />}>
                <Route exact path="/user/:id" element={<UserSummary />} />
                <Route
                  exact
                  path="/user/:id/repairs"
                  element={<UserRepairs />}
                />
                <Route
                  exact
                  path="/user/:id/devices"
                  element={<DevicesTable />}
                />
                <Route exact path="/user/:id/edit" element={<EditUser />} />
              </Route>

              <Route exact path="/devices" element={<Devices />}>
                <Route exact path="/devices" element={<DevicesTable />} />
                <Route exact path="/devices/:id" element={<SingleDevice />} />
              </Route>

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
