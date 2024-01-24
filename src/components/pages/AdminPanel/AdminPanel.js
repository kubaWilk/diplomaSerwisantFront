import React from "react";
import { Link, Outlet } from "react-router-dom";
import SectionName from "../../layout/SectionName";

const AdminPanel = () => {
  return (
    <div className="flex flex-col items-center justify-start w-full">
      <SectionName text="Panel administratora" />
      <div className="flex space-x-2">
        <Link className="button" to="/app/admin-panel/users">
          Zarządzaj użytkownikami
        </Link>
        <Link className="button" to="/app/admin-panel/statistics">
          Statystyki
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default AdminPanel;
