import React from "react";
import Navbar from "./layout/Navbar";
import SideMenu from "./layout/SideMenu";
import Repairs from "./pages/Repairs/Repairs";
import { Routes, Route } from "react-router-dom";
import Users from "./pages/Users/Users";
import Home from "./pages/Home/Home";
import Devices from "./pages/Devices/Devices";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
import Repair from "./pages/Repairs/Repair/Repair";
import AddRepair from "./pages/Repairs/Add/AddRepair";
import EditRepair from "./pages/Repairs/Repair/EditRepair";
import Notes from "./pages/Repairs/Repair/Notes";
import Cost from "./pages/Repairs/Repair/Cost/Cost";
import SingleUser from "./pages/Users/SingleUser/SingleUser";
import UserSummary from "./pages/Users/SingleUser/UserSummary";
import UserRepairs from "./pages/Users/SingleUser/UserRepairs";
import EditUserModal from "./pages/Users/SingleUser/EditUserModal";
import SingleDevice from "./pages/Devices/SingleDevice/SingleDevice";
import DevicesTable from "./pages/Devices/DevicesTable";
import DeviceSummary from "./pages/Devices/SingleDevice/DeviceSummary";
import DeviceRepairs from "./pages/Devices/SingleDevice/DeviceRepairs";
import EditDeviceModal from "./pages/Devices/SingleDevice/EditDeviceModal";
import UserPanel from "./pages/Users/SingleUser/UserPanel";
import ChangePasswordModal from "./pages/Users/SingleUser/ChangePasswordModal";
import ResetPaswordPage from "./pages/Login/ResetPasswordPage";
import Photos from "./pages/Repairs/Repair/Photos";

function DashRouter() {
  return (
    <div className="w-screen">
      <Navbar />
      <div className="flex screen-height relative">
        <SideMenu />
        <Routes>
          {/* Main route */}
          <Route exact path="/home" element={<Home />} />
          {/* Reset password route */}

          {/* Repairs Routes */}
          <Route exact path="/repairs" element={<Repairs />} />
          <Route exact path="/repairs/:id" element={<Repair />} />
          <Route exact path="/repairs/:id/notes" element={<Notes />} />
          <Route exact path="/repairs/:id/cost" element={<Cost />} />
          <Route exact path="/repairs/:id/photos" element={<Photos />} />
          <Route exact path="/repairs/edit/:id" element={<EditRepair />} />
          <Route exact path="/repairs/new" element={<AddRepair />} />
          {/* Users Routes */}
          <Route exact path="/users" element={<Users />} />
          <Route exact path="/user" element={<SingleUser />}>
            <Route exact path="/user/:id" element={<UserSummary />} />
            <Route exact path="/user/:id/repairs" element={<UserRepairs />} />
            <Route exact path="/user/:id/devices" element={<DevicesTable />} />
            <Route exact path="/user/:id/edit" element={<EditUserModal />} />
          </Route>
          <Route exact path="/user/self/about" element={<UserPanel />}>
            <Route
              exact
              path="/user/self/about/edit"
              element={<EditUserModal />}
            />
            <Route
              exact
              path="/user/self/about/password-change"
              element={<ChangePasswordModal />}
            />
          </Route>

          <Route exact path="/devices" element={<Devices />}>
            <Route exact path="/devices" element={<DevicesTable />} />
            <Route exact path="/devices/:id" element={<SingleDevice />}>
              <Route
                exact
                path="/devices/:id/summary"
                element={<DeviceSummary />}
              />
              <Route
                exact
                path="/devices/:id/repairs"
                element={<DeviceRepairs />}
              />
              <Route
                exact
                path="/devices/:id/edit"
                element={<EditDeviceModal />}
              />
            </Route>
          </Route>

          <Route exact path="/admin-panel" element={<AdminPanel />}>
            <Route
              exact
              path="/admin-panel/users"
              element={<Users displayOnlyCustomers={false} />}
            />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default DashRouter;
