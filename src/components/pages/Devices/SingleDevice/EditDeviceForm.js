import axios from "axios";
import React, { Fragment, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AlertContext from "../../../../context/Alert/AlertContext";
import UserContext from "../../../../context/User/UserContext";
import Alert from "../../../layout/Alert";
import { Config } from "../../../../config";

const EditDeviceForm = ({ deviceData }) => {
  const [manufacturer, setManufacturer] = useState(deviceData.manufacturer);
  const [model, setModel] = useState(deviceData.model);
  const [serialNumber, setSerialNumber] = useState(deviceData.serialNumber);
  const [stateAtArrival, setStateAtArrival] = useState(
    deviceData.stateAtArrival
  );

  const { setAlert } = useContext(AlertContext);
  const { id } = useParams();
  const {
    user: { jwt: token },
  } = useContext(UserContext);
  const navigate = useNavigate();

  const inputStyle =
    "border-2 border-gray-400 outline-black rounded-md p-1 px-5";

  const onSubmit = () => {
    if (checkInput()) return;
    axios
      .put(
        `${Config.apiUrl}/api/devices/${id}`,
        {
          data: {
            ...deviceData,
            manufacturer: manufacturer,
            model: model,
            serialNumber: serialNumber,
            stateAtArrival: stateAtArrival,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => navigate(-1))
      .catch((e) => {
        console.log(e);
        setAlert("Błąd połączenia. Prosimy spróbować ponownie");
      });
  };

  const checkInput = () => {
    if (manufacturer === "") {
      setAlert("Producent sprzętu nie może być pusty.");
      return true;
    }

    if (model === "") {
      setAlert("Model sprzętu nie może być pusty.");
      return true;
    }

    return false;
  };

  const labelStyle = "text-center uppercase flex flex-col";

  return (
    <Fragment>
      <h2 className="uppercase text-center font-bold m-2 text-lg">Edytuj</h2>
      <form
        data-testid="EditDeviceForm"
        className="px-5 flex flex-col items-center justify-center"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col space-y-1">
          <label htmlFor="manufacturer" className={labelStyle}>
            <strong>Producent</strong>
            <input
              id="manufacturer"
              name="manufacturer"
              className={inputStyle}
              type="text"
              placeholder="Producent"
              value={manufacturer}
              onChange={(e) => setManufacturer(e.target.value)}
            />
          </label>
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="model" className={labelStyle}>
            <strong>Model</strong>
            <input
              id="model"
              name="model"
              className={inputStyle}
              type="text"
              placeholder="Model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />
          </label>
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="serialNumber" className={labelStyle}>
            <strong>Nr seryjny</strong>
            <input
              id="serialNumber"
              name="serialNumber"
              className={inputStyle}
              type="text"
              placeholder="Nr seryjny"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
            />
          </label>
        </div>

        <div className="flex flex-col space-y-1">
          <label htmlFor="stateAtArrival" className={labelStyle}>
            <strong>Stan przy przyjęciu</strong>
            <input
              id="stateAtArrival"
              name="stateAtArrival"
              className={inputStyle}
              type="text"
              placeholder="Stan przy przyjęciu"
              value={stateAtArrival}
              onChange={(e) => setStateAtArrival(e.target.value)}
            />
          </label>
        </div>
        <Alert />
      </form>
      <div className="mt-2 flex space-x-2 w-full justify-center items-center">
        <button
          type="submit"
          className="font-bold uppercase border-2 px-2 m-2 border-green-500 hover:text-white hover:bg-green-500 duration-200"
          onClick={(e) => onSubmit(e)}
        >
          Zapisz
        </button>
        <button
          className="font-bold uppercase border-2 px-2 m-2 border-red-500 hover:text-white hover:bg-red-500 duration-200"
          onClick={() => navigate(-1)}
        >
          Anuluj
        </button>
      </div>
    </Fragment>
  );
};

export default EditDeviceForm;
