import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import SingleRepairContext from "../../../../context/SingleRepair/SingleRepairContext";
import UserContext from "../../../../context/User/UserContext";

const SingleRepairNavButtons = ({
  deleteDialogDoggleSetter: setDeleteDialogToggle,
}) => {
  const { repair } = useContext(SingleRepairContext);
  const { isAdmin, isCustomer } = useContext(UserContext);
  const { customer, device } = repair;
  const { id } = useParams();

  return (
    <div className="flex space-x-2">
      {!isCustomer() && (
        <Link
          className="text-black border-2 p-2 border-black font-bold hover:text-white hover:bg-black uppercase duration-200 mt-4 mb-4"
          to={`/user/${customer.id}/edit`}
        >
          Edytuj klienta
        </Link>
      )}
      {!isCustomer() && (
        <Link
          className="text-black border-2 p-2 border-black font-bold hover:text-white hover:bg-black uppercase duration-200 mt-4 mb-4"
          to={`/devices/${device.id}/edit`}
        >
          Edytuj urządzenie
        </Link>
      )}
      {isAdmin() && (
        <button
          className="text-black border-2 p-2 border-black font-bold hover:text-white hover:bg-black uppercase duration-200 mt-4 mb-4"
          onClick={() => {
            setDeleteDialogToggle(true);
          }}
        >
          Usuń
        </button>
      )}
      <Link
        className="text-black border-2 p-2 border-black font-bold hover:text-white hover:bg-black uppercase duration-200 mt-4 mb-4"
        to={`/app/repairs/${id}/notes`}
      >
        Notatki
      </Link>
      <Link
        className="text-black border-2 p-2 border-black font-bold hover:text-white hover:bg-black uppercase duration-200 mt-4 mb-4"
        to={`/repairs/${id}/cost`}
      >
        Kosztorys
      </Link>
      <Link
        className="text-black border-2 p-2 border-black font-bold hover:text-white hover:bg-black uppercase duration-200 mt-4 mb-4"
        to={`/repairs/${id}/photos`}
      >
        Zdjęcia
      </Link>
    </div>
  );
};

export default SingleRepairNavButtons;
