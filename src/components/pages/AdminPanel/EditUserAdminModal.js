import React, { useState, useEffect, useContext, Fragment } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import EditUserFormAdmin from "./EditUserFormAdmin";
import Loading from "../../layout/Loading";
import UserContext from "../../../context/User/UserContext";
import { Config } from "../../../config";

const EditUserAdminModal = ({ toggleSetter }) => {
  const { user, getToken } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      await axios
        .get(`${Config.apiUrl}/user/${id}`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        .then((res) => {
          setUserData(res.data);
          setIsLoading(false);
        })
        .catch((error) => console.log("UserSummary/fetchUser", error));
    };

    if (id === undefined) {
      setUserData(user);
      setIsLoading(false);
    } else fetchUser();
  }, []);

  return (
    <div className="w-screen h-screen z-50 fixed top-0 right-0 bg-gray-200 bg-opacity-70">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="bg-white border-2 border-black p-2 rounded-md flex flex-col ">
          {isLoading ? (
            <Loading />
          ) : (
            <EditUserFormAdmin
              userData={userData}
              toggleSetter={toggleSetter}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EditUserAdminModal;
