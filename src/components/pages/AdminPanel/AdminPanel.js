import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import SectionName from "../../layout/SectionName";
import AddButton from "../../layout/AddButton";
import AddUserModal from "./AddUserModal";

const AdminPanel = () => {
  const [addUserToggle, setAddUserToggle] = useState(false);

  return (
    <div
      data-testid="adminPanel"
      className="flex flex-col items-center justify-start w-full"
    >
      <SectionName text="Panel administratora" />
      <div className="flex space-x-2">
        <Link className="button" to="/admin-panel/users">
          Zarządzaj użytkownikami
        </Link>
        {/* <Link className="button">Statystyki</Link> */}
      </div>
      {addUserToggle && <AddUserModal showToggle={setAddUserToggle} />}
      <AddButton onClick={() => setAddUserToggle(!addUserToggle)} />
      <Outlet />
    </div>
  );
};

export default AdminPanel;
