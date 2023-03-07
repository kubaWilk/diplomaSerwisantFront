import React, { useState, useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Dialog from "../../../layout/Dialog";
import UserContext from "../../../../context/User/UserContext";
import { Config } from "../../../../config";

const SingleUser = () => {
  const { id } = useParams();
  const location = useLocation();
  const [deleteModalToggle, setDeleteModalToggle] = useState(false);
  const {
    user: { jwt: token },
  } = useContext(UserContext);
  const navigate = useNavigate();

  const { isAdmin } = useContext(UserContext);

  const deleteUser = async () => {
    axios
      .delete(`${Config.apiUrl}/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(navigate(-1))
      .catch((e) => console.log(e));
  };

  return (
    <div className="flex flex-col items-center justify-start w-full">
      <div className="flex space-x-2">
        <Link
          className="text-black border-2 p-2 border-black font-bold hover:text-white hover:bg-black uppercase duration-200 mt-4 mb-4"
          to={`/user/${id}`}
        >
          Podsumowanie
        </Link>
        <Link
          className="text-black border-2 p-2 border-black font-bold hover:text-white hover:bg-black uppercase duration-200 mt-4 mb-4"
          to={`/user/${id}/repairs`}
        >
          Naprawy
        </Link>
        <Link
          className="text-black border-2 p-2 border-black font-bold hover:text-white hover:bg-black uppercase duration-200 mt-4 mb-4"
          to={`/user/${id}/edit`}
        >
          Edytuj
        </Link>
        {isAdmin() && (
          <button
            className="text-black border-2 p-2 border-black font-bold hover:text-white hover:bg-black uppercase duration-200 mt-4 mb-4"
            onClick={() => {
              setDeleteModalToggle(true);
            }}
          >
            Usuń
          </button>
        )}
        {deleteModalToggle && (
          <Dialog
            prompt="Czy chcesz usunąć tego użytkownika? Spowoduje to usunięcie powiązanych napraw i urządzeń!"
            onApprove={() => {
              deleteUser();
              setDeleteModalToggle(false);
            }}
            onCancel={() => {
              setDeleteModalToggle(false);
            }}
          />
        )}
      </div>
      <Outlet key={location.pathname} />
    </div>
  );
};

export default SingleUser;
