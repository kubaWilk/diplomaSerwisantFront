import React, { useContext } from "react";
import Navbar from "./layout/Navbar";
import SideMenu from "./layout/SideMenu";
import Repairs from "./pages/Repairs/Repairs";
import { Routes, Route, useNavigate } from "react-router-dom";
import Users from "./pages/Users/Users";
import Home from "./pages/Home/Home";
import Devices from "./pages/Devices/Devices";
import AdminPanel from "./pages/AdminPanel/AdminPanel";
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
import UserContext from "../context/User/UserContext";
import DashContainer from "./DashContainer";

function DashRouter() {
  const { isLoggedIn } = useContext(UserContext);
  const { navigate } = useNavigate();

  if (isLoggedIn())
    return (
      <>
        <DashContainer />
        <Routes>
          {/* Main route */}
          <Route exact path="/home" element={<Home />} />
          {/* Reset password route */}

          {/* Users Routes */}
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
        </Routes>
      </>
    );
  else return <>{navigate("/")}</>;
}

export default DashRouter;
