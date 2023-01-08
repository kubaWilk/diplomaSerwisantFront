import axios from "axios";
import React, { useState } from "react";
import { useParams, Link, Outlet, useNavigate } from "react-router-dom";
import Dialog from "../../../layout/Dialog";

const SingleDevice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deleteModalToggle, setDeleteModalToggle] = useState(false);

  const deleteDevice = async () => {
    axios
      .delete(`/devices/${id}`)
      .then(() => {
        setDeleteModalToggle(false);
        navigate("/devices");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="flex flex-col items-center justify-start w-full">
      <div className="flex space-x-2">
        <Link className="button" to={`/devices/${id}/summary`}>
          Podsumowanie
        </Link>
        <Link className="button" to={`/devices/${id}/repairs`}>
          Powiązane naprawy
        </Link>
        <button
          onClick={(e) => navigate(`/devices/${id}/edit`)}
          className="button"
        >
          Edytuj
        </button>
        <button onClick={() => setDeleteModalToggle(true)} className="button">
          Usuń
        </button>
        {deleteModalToggle && (
          <Dialog
            prompt="Czy chcesz usunąć urządzenie? Spowoduje to usuniecie powiązanych z nim napraw."
            onApprove={() => {
              deleteDevice();
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
