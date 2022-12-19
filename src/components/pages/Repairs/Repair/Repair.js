import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SingleRepairContext from "../../../../context/SingleRepair/SingleRepairContext";
import Loading from "../../../layout/Loading";
import SectionName from "../../../layout/SectionName";
import { Link } from "react-router-dom";
import Dialog from "../../../layout/Dialog";

const Repair = () => {
  const { id } = useParams();
  const { isLoading, repair, fetchRepairById, removeRepair } =
    useContext(SingleRepairContext);
  const { customer, user, device } = repair;
  const navigate = useNavigate();
  const [deleteDialogToggle, setDeleteDialogToggle] = useState(false);

  useEffect(() => {
    console.log(isLoading);
    fetchRepairById(id);
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="flex w-full flex-col items-center justify-start">
      {deleteDialogToggle && (
        <Dialog
          prompt={`Czy chcesz usunąć naprawę nr ${repair.id}`}
          onApprove={() => {
            removeRepair(id);
            navigate(-1);
          }}
          onCancel={() => setDeleteDialogToggle(false)}
        />
      )}
      <SectionName text={`Naprawa #${id}`} />
      <div className="flex space-x-2">
        <Link
          className="text-black border-2 p-2 border-black font-bold hover:text-white hover:bg-black uppercase duration-200 mt-4 mb-4"
          to={`/repairs/edit/${id}`}
        >
          Edytuj
        </Link>
        <button
          className="text-black border-2 p-2 border-black font-bold hover:text-white hover:bg-black uppercase duration-200 mt-4 mb-4"
          onClick={(e) => {
            // removeRepair(id);
            setDeleteDialogToggle(true);
          }}
        >
          Usuń
        </button>
        <Link
          className="text-black border-2 p-2 border-black font-bold hover:text-white hover:bg-black uppercase duration-200 mt-4 mb-4"
          to={`/repairs/${id}/notes`}
        >
          Notatki
        </Link>
      </div>
      <div className="flex w-[90%] h-full flex-col ">
        <div className="border-b-2 border-gray-200 border-dotted p-2">
          <ul>
            <li>
              <strong>ID:</strong> {repair.id}
            </li>
            <li>
              <strong>Status naprawy:</strong> {repair.status}
            </li>
          </ul>
        </div>
        <div className="border-b-2 border-gray-200 border-dotted p-2">
          <ul>
            <li>
              <strong>Typ: </strong> {device.type}
            </li>
            <li>
              <strong>Producent:</strong> {device.manufacturer}
            </li>
            <li>
              <strong>Model: </strong> {device.model}
            </li>
            <li>
              <strong>Nr seryjny:</strong> {device.sn}
            </li>
            <li>
              <strong>Stan podczas przyjęcia:</strong> {device.stateAtArrival}
            </li>
          </ul>
        </div>
        <div className="p-2">
          <ul>
            <li>
              <strong>Imię: </strong>
              {customer.firstName}
            </li>
            <li>
              <strong>Nazwisko:</strong> {customer.lastName}
            </li>
            <li>
              <strong>Nr kontaktowy:</strong> {customer.phoneNumber}
            </li>
            <li>
              <strong>Ulica:</strong> {customer.street}
            </li>
            <li>
              <strong>Miasto:</strong> {customer.city}
            </li>
            <li>
              <strong>Kod pocztowy: </strong>
              {customer.postCode}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Repair;
