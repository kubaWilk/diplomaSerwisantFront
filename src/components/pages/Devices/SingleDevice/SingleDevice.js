import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { useParams, Link, Outlet, useNavigate } from "react-router-dom";
import UserContext from "../../../../context/User/UserContext";
import Dialog from "../../../layout/Dialog";
import { Config } from "../../../../config";

const SingleDevice = () => {
  const { id } = useParams();
  const { isAdmin, isCustomer, getToken } = useContext(UserContext);
  const navigate = useNavigate();
  const [deleteModalToggle, setDeleteModalToggle] = useState(false);

  const deleteDevice = async () => {
    await axios
      .delete(`${Config.apiUrl}/device/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .catch((e) => {
        console.log(e);
      });

    setDeleteModalToggle(false);
    navigate("/app/devices");
  };

  return (
    <div className="flex flex-col items-center justify-start w-full">
      <div className="flex space-x-2">
        <Link className="button" to={`/app/devices/${id}/summary`}>
          Podsumowanie
        </Link>
        <Link className="button" to={`/app/devices/${id}/repairs`}>
          Powiązane naprawy
        </Link>
        {!isCustomer() && (
          <button
            onClick={(e) => navigate(`/app/devices/${id}/edit`)}
            className="button"
          >
            Edytuj
          </button>
        )}
        {isAdmin() && (
          <button onClick={() => setDeleteModalToggle(true)} className="button">
            Usuń
          </button>
        )}
        {deleteModalToggle && (
          <Dialog
            prompt="Czy chcesz usunąć urządzenie? Spowoduje to usuniecie powiązanych z nim napraw."
            onApprove={async () => {
              await deleteDevice();
            }}
            onCancel={() => setDeleteModalToggle(false)}
          />
        )}
      </div>
      <Outlet />
    </div>
  );
};

export default SingleDevice;
