import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import UserContext from "../../../context/User/UserContext";
import axios from "axios";
import { Config } from "../../../config.js";
import Loading from "../../layout/Loading.js";
import EditUserAdminModal from "./EditUserAdminModal.js";
import Dialog from "../../layout/Dialog.js";

const AdminPanelUserSummary = () => {
  const { id } = useParams();
  const { getToken, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    phoneNumber: "",
    city: "",
    street: "",
    postCode: "",
  });

  const [editUserToggle, setEditUserToggle] = useState(false);
  const [deleteUserToggle, setDeleteUserToggle] = useState(false);

  const fetchUser = useCallback(async () => {
    const res = await axios
      .get(`${Config.apiUrl}/user/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .catch((e) => {
        if (e.response.status === 401) {
          logout();
          navigate("/");
        }
      });

    setUserData(res.data);
    setIsLoading(false);
  }, [setUserData, setIsLoading]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const deleteUser = async () => {
    axios
      .delete(`${Config.apiUrl}/user/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .catch((e) => console.log(e));

    setDeleteUserToggle(false);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-2 w-full">
      <div className="flex justify-center space-x-2">
        <Link
          className="text-black border-2 p-2 border-black font-bold hover:text-white hover:bg-black uppercase duration-200 mt-4 mb-4"
          to={`/app/admin-panel/users/${id}`}
        >
          Podsumowanie
        </Link>
        <button
          className="text-black border-2 p-2 border-black font-bold hover:text-white hover:bg-black uppercase duration-200 mt-4 mb-4"
          onClick={() => setEditUserToggle(true)}
        >
          Edytuj
        </button>
        <button
          className="text-black border-2 p-2 border-black font-bold hover:text-white hover:bg-black uppercase duration-200 mt-4 mb-4"
          onClick={() => {
            setDeleteUserToggle(true);
          }}
        >
          Usuń
        </button>
      </div>

      <ul>
        <li>
          <strong>ID: </strong>
          {userData.id}
        </li>
        <li>
          <strong>Imię: </strong>
          {userData.userInfo.firstName}
        </li>
        <li>
          <strong>Nazwisko: </strong>
          {userData.userInfo.lastName}
        </li>
        <li>
          <strong>Nr kontaktowy: </strong>
          {userData.userInfo.phoneNumber}
        </li>
        <li>
          <strong>Adres e-mail: </strong>
          {userData.email}
        </li>
        <div className="border-b-2 border-gray-400 border-dotted mt-2">
          Adres:
        </div>
        <li>
          <strong>Ulica </strong>
          {userData.userInfo.street}
        </li>
        <li>
          <strong>Miasto </strong>
          {userData.userInfo.city}
        </li>
        <li>
          <strong>Kod Pocztowy </strong>
          {userData.userInfo.postCode}
        </li>
      </ul>
      {editUserToggle && (
        <EditUserAdminModal toggleSetter={setEditUserToggle} />
      )}
      {deleteUserToggle && (
        <Dialog
          prompt="Czy chcesz usunąć tego użytkownika? Spowoduje to usunięcie powiązanych napraw i urządzeń!"
          onApprove={async () => {
            deleteUser();
            setDeleteUserToggle(false);
          }}
          onCancel={() => {
            setDeleteUserToggle(false);
          }}
        />
      )}
    </div>
  );
};

export default AdminPanelUserSummary;
