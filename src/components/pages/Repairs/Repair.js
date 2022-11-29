import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import RepairsContext from "../../../context/Repairs/RepairsContext";
import Loading from "../../layout/Loading";
import SectionName from "../../layout/SectionName";

const Repair = () => {
  const { id } = useParams();
  const { isLoading, repair, fetchRepairById } = useContext(RepairsContext);

  useEffect(() => {
    fetchRepairById(id);
  }, []);

  if (isLoading) return <Loading />;

  const { customer, user, device } = repair;

  return (
    <div className="repair-info flex w-full flex-col items-center justify-start">
      <SectionName text={`Naprawa #${id}`} />
      <div className="flex space-x-4">
        <div>
          <ul>
            <li>
              <strong>ID:</strong> {repair.id}
            </li>
            <li>
              <strong>Status naprawy:</strong> {repair.status}
            </li>
          </ul>
        </div>
        <div>
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
