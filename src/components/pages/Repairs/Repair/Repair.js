import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SingleRepairContext from "../../../../context/SingleRepair/SingleRepairContext";
import Loading from "../../../layout/Loading";
import SectionName from "../../../layout/SectionName";
import { Link } from "react-router-dom";
import Dialog from "../../../layout/Dialog";
import UserContext from "../../../../context/User/UserContext";
import RepairStatus from "../../../layout/RepairStatus";
import SingleRepairNavButtons from "./SingleRepairNavButtons";
import axios from "axios";
import { Config } from "../../../../config";

const Repair = () => {
  const [deleteDialogToggle, setDeleteDialogToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const { repair, setRepair, removeRepair } = useContext(SingleRepairContext);
  const { getToken } = useContext(UserContext);
  const authToken = getToken();
  const { customer, device } = repair;
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    const res = await axios.get(`${Config.apiUrl}/repair/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    setRepair(res.data);
    setIsLoading(false);
  }, [this]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading) return <Loading />;

  return (
    <div className="flex w-full flex-col items-center justify-start">
      {deleteDialogToggle && (
        <Dialog
          prompt={`Czy chcesz usunąć naprawę nr ${id}`}
          onApprove={async () => {
            await removeRepair(id, authToken)
              .then(() => {
                navigate(-1);
              })
              .catch((e) => {
                navigate("/app/error");
                console.log(e);
              });
          }}
          onCancel={() => setDeleteDialogToggle(false)}
        />
      )}
      <SectionName text={`Naprawa #${id}`} />
      <SingleRepairNavButtons
        deleteDialogDoggleSetter={setDeleteDialogToggle}
      />
      <div className="flex w-[90%] h-full flex-col ">
        <RepairStatus />
        <div className="border-b-2 border-gray-200 border-dotted p-2">
          <ul>
            <li>
              <strong>Opis usterki:</strong> {repair.description}
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
              <strong>Nr seryjny:</strong> {device.serialNumber}
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
