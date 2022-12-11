import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import SingleRepairContext from "../../../context/SingleRepair/SingleRepairContext";
import Loading from "../../layout/Loading";
import SectionName from "../../layout/SectionName";
import { Link } from "react-router-dom";

const Repair = () => {
  const { id } = useParams();

  const { isLoading, repair, fetchRepairById, removeRepair } =
    useContext(SingleRepairContext);

  const { customer, user, device } = repair;

  useEffect(() => {
    console.log(isLoading);
    fetchRepairById(id);
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="repair-info flex w-full flex-col items-center justify-start">
      <SectionName text={`Naprawa #${id}`} />
      <div className="flex space-x-2">
        <Link
          className="text-black border-2 p-2 border-black font-bold hover:text-white hover:bg-black uppercase duration-200 mt-4 mb-4"
          to={`/repairs/edit/${id}`}
        >
          Edytuj
        </Link>
        <Link
          className="text-black border-2 p-2 border-black font-bold hover:text-white hover:bg-black uppercase duration-200 mt-4 mb-4"
          to={"/repairs"}
          onClick={(e) => {
            removeRepair(id);
            alert("Naprawa usunięta");
          }}
        >
          Usuń
        </Link>
      </div>
      <div className="flex space-x-4">
        <div className="border-r-2 border-black p-2">
          <ul>
            <li>
              <strong>ID:</strong> {repair.id}
            </li>
            <li>
              <strong>Status naprawy:</strong> {repair.status}
            </li>
          </ul>
        </div>
        <div className="border-r-2 border-black p-2">
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
        <div>
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
