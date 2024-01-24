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

  const { setAlert } = useContext(AlertContext);
  const { id } = useParams();
  const { getToken } = useContext(UserContext);
  const navigate = useNavigate();

  const inputStyle =
    "border-2 border-gray-400 outline-black rounded-md p-1 px-5";

  const onSubmit = async () => {
    await axios
      .put(
        `${Config.apiUrl}/device/${id}`,
        {
          ...deviceData,
          manufacturer: manufacturer,
          model: model,
          serialNumber: serialNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      )
      .then(() => navigate(-1))
      .catch((e) => {
        setAlert("Błąd połączenia. Prosimy spróbować ponownie");
      });
  };

  return (
    <Fragment>
      <h2 className="uppercase text-center font-bold m-2 text-lg">Edytuj</h2>
      <form
        className="px-5 flex flex-col items-center justify-center"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="manufacturer"
            className="text-center font-bold uppercase"
          >
            Producent
          </label>
          <input
            name="manufacturer"
            className={inputStyle}
            type="text"
            placeholder="Producent"
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="model" className="text-center font-bold uppercase">
            Model
          </label>
          <input
            name="model"
            className={inputStyle}
            type="text"
            placeholder="Model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="serialNumber"
            className="text-center font-bold uppercase"
          >
            Nr seryjny
          </label>
          <input
            name="serialNumber"
            className={inputStyle}
            type="text"
            placeholder="S\N"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
          />
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
