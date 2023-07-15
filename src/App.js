import "./App.css";
import "./index.css";
import Navbar from "./components/layout/Navbar";
import SideMenu from "./components/layout/SideMenu";
import Repairs from "./components/pages/Repairs/Repairs";
import {
  Routes,
  Route,
  useNavigate,
  Outlet,
  useLocation,
} from "react-router-dom";
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
import EditUserModal from "./components/pages/Users/SingleUser/EditUserModal";
import SingleDevice from "./components/pages/Devices/SingleDevice/SingleDevice";
import DevicesTable from "./components/pages/Devices/DevicesTable";
import DeviceSummary from "./components/pages/Devices/SingleDevice/DeviceSummary";
import DeviceRepairs from "./components/pages/Devices/SingleDevice/DeviceRepairs";
import EditDeviceModal from "./components/pages/Devices/SingleDevice/EditDeviceModal";
import UserPanel from "./components/pages/Users/SingleUser/UserPanel";
import ChangePasswordModal from "./components/pages/Users/SingleUser/ChangePasswordModal";
import { useContext, useEffect } from "react";
import UserContext from "./context/User/UserContext";
import LoginPage from "./components/pages/Login/LoginPage";
import Photos from "./components/pages/Repairs/Repair/Photos";
import Error from "./components/pages/Error";
import PasswordReset from "./components/pages/Login/PasswordReset/PasswordReset";
import NewPassword from "./components/pages/Login/PasswordReset/NewPassword";

function App() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const isUserEmpty = JSON.stringify(user) === "{}";
  const location = useLocation();

  useEffect(() => {
    if (isUserEmpty && location.pathname === "/") navigate("/login");
  }, []);

  return (
    <div className="w-screen">
      {!isUserEmpty && <Navbar />}
      <div className="flex screen-height relative">
        {!isUserEmpty && <SideMenu />}
        <Routes>
          {/* Main route */}
          <Route exact path="/home" element={<Home />} />

          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/password-reset" element={<PasswordReset />} />
          <Route exact path="/password-reset/new" element={<NewPassword />} />

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
          <Route exact path="/error" element={<Error />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
