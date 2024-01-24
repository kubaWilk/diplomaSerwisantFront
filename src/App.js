import "./App.css";
import "./index.css";
import { useContext, useEffect, useState } from "react";
import UserContext from "./context/User/UserContext";
import LoginPage from "./components/pages/Login/LoginPage";
import DashRouter from "./components/DashRouter";
import ResetPaswordPage from "./components/pages/Login/ResetPasswordPage";
import { Routes, Route, useLocation, useHref } from "react-router-dom";
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
import EditUserModal from "./components/pages/Users/SingleUser/EditUserModal";
import EditDeviceModal from "./components/pages/Devices/SingleDevice/EditDeviceModal";
import Users from "./components/pages/Users/Users";
import SingleUser from "./components/pages/Users/SingleUser/SingleUser";
import UserRepairs from "./components/pages/Users/SingleUser/UserRepairs";
import DevicesTable from "./components/pages/Devices/DevicesTable";
import Devices from "./components/pages/Devices/Devices";
import SingleDevice from "./components/pages/Devices/SingleDevice/SingleDevice";
import DeviceSummary from "./components/pages/Devices/SingleDevice/DeviceSummary";
import DeviceRepairs from "./components/pages/Devices/SingleDevice/DeviceRepairs";
import ProtocolModal from "./components/pages/Repairs/Repair/ProtocolModal";
import AdminPanel from "./components/pages/AdminPanel/AdminPanel";
import StatsContainer from "./components/pages/AdminPanel/StatsContainer";

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
              path="/app/repairs/:id/protocols"
              element={<ProtocolModal />}
            />
            <Route
              exact
              path="/app/repairs/user/:id/edit"
              element={<EditUserModal />}
            />
            <Route
              exact
              path="/app/repairs/device/:id/edit"
              element={<EditDeviceModal />}
            />
            <Route
              exact
              path="/app/repairs/edit/:id"
              element={<EditRepair />}
            />
            <Route exact path="/app/repairs/new" element={<AddRepair />} />
            <Route exact path="/app/repairs/:id/costs" element={<Cost />} />
          </Route>
          <Route exact path="/app/customers" element={<Users />}>
            <Route exact path="/app/customers/:id" element={<SingleUser />}>
              <Route
                exact
                path="/app/customers/:id/repairs"
                element={<UserRepairs />}
              />
              <Route
                exact
                path="/app/customers/:id/edit"
                element={<EditUserModal />}
              />
              */
            </Route>
          </Route>
          <Route exact path="/app/devices" element={<Devices />}>
            <Route exact path="/app/devices" element={<DevicesTable />} />
            <Route exact path="/app/devices/:id" element={<SingleDevice />}>
              <Route
                exact
                path="/app/devices/:id/summary"
                element={<DeviceSummary />}
              />
              <Route
                exact
                path="/app/devices/:id/repairs"
                element={<DeviceRepairs />}
              />
              <Route
                exact
                path="/app/devices/:id/edit"
                element={<EditDeviceModal />}
              />
            </Route>
          </Route>
          <Route exact path="/app/admin-panel" element={<AdminPanel />}>
            <Route
              exact
              path="/app/admin-panel/users"
              element={<Users displayOnlyCustomers={false} />}
            />
            <Route
              exact
              path="/app/admin-panel/statistics"
              element={<StatsContainer />}
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
