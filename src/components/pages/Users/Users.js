import React from "react";
import SectionName from "../../layout/SectionName";
import { Outlet, useLocation } from "react-router-dom";
import UsersList from "./SingleUser/UsersList";

const Users = () => {
  const location = useLocation();
  return (
    <div className="flex flex-col items-center justify-start w-[90%]">
      <SectionName text="Klienci" />
      {location.pathname === "/app/customers" ? <UsersList /> : <Outlet />}
    </div>
  );
};

Users.defaultProps = {
  displayOnlyCustomers: true,
};

export default Users;
