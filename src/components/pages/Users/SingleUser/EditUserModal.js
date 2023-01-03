import React, { useState, useEffect } from "react";
import EditUserForm from "./EditUserForm";
import Loading from "../../../layout/Loading";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditUserModal = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users/${id}`);
      setUserData(res.data);
      setIsLoading(false);
    };

    fetchUser();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="w-screen h-screen z-50 fixed top-0 right-0 bg-gray-200 bg-opacity-70">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="bg-white border-2 border-black p-2 rounded-md flex flex-col ">
          {isLoading ? <Loading /> : <EditUserForm userData={userData} />}
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
