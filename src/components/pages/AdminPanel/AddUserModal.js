import React, { useState } from "react";
import AddUserForm from "./AddUserForm";

const AddUserModal = ({ showToggle }) => {
  const [userData, setUserData] = useState({});

  return (
    <div className="w-screen h-screen z-50 fixed top-0 right-0 bg-gray-200 bg-opacity-70">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="bg-white border-2 border-black p-2 rounded-md flex flex-col ">
          <AddUserForm userData={userData} showToggle={showToggle} />
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
