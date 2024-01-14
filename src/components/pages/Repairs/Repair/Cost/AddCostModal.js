import axios from "axios";
import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AlertContext from "../../../../../context/Alert/AlertContext";
import UserContext from "../../../../../context/User/UserContext";
import Alert from "../../../../layout/Alert";
import { Config } from "../../../../../config";

const AddCostModal = ({ closeToggle }) => {
  const { getToken } = useContext(UserContext);
  const token = getToken();
  const navigate = useNavigate();
  const { id } = useParams();
  const { setAlert } = useContext(AlertContext);
  const [costType, setCostType] = useState("SERVICE");
  const [costPrice, setCostPrice] = useState("");
  const [costName, setCostName] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    if (dataCheck()) {
      await axios
        .post(
          `${Config.apiUrl}/cost/?repairid=${id}`,
          {
            costType: costType,
            name: costName,
            price: costPrice,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .catch((e) => navigate("/app/error"));
      closeToggle(false);
    }
  };

  const dataCheck = () => {
    //prettier-ignore
    const priceRegex = new RegExp("(\[0-9]+(\.\[0-9]{1,2})?)");

    if ((costName === null) | (costName === "")) {
      setAlert("Nazwa nie może być pusta!");
      return false;
    }

    if ((costPrice === null) | (costPrice === "")) {
      setAlert("Cena nie może być pusta!");
      return false;
    }

    if (!priceRegex.test(costPrice)) {
      setAlert("Nieprawidłowa cena!");
      return false;
    }

    return true;
  };

  return (
    <div className="w-screen h-screen z-50 fixed top-0 right-0 bg-gray-200 bg-opacity-70">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="bg-white border-2 border-black p-2 rounded-md">
          <form onSubmit={onSubmit}>
            <div className="flex flex-col space-y-2">
              <label className="text-center font-bold uppercase">
                Dodaj element
              </label>
              <input
                type="text"
                placeholder="Nazwa elementu"
                name="costName"
                value={costName}
                className="border-2 border-gray-400 outline-black rounded-md p-1 w-72 mx-2"
                onChange={(e) => setCostName(e.target.value)}
              />

              <input
                type="text"
                placeholder="Cena"
                name="costPrice"
                value={costPrice}
                className="border-2 border-gray-400 outline-black rounded-md p-1 w-72 mx-2"
                onChange={(e) => setCostPrice(e.target.value)}
              />
            </div>

            <div className="flex w-full justify-center space-x-2 mt-1">
              <label htmlFor="service">
                <input
                  type="radio"
                  value="service"
                  name="service"
                  checked={costType === "SERVICE"}
                  onChange={() => setCostType("SERVICE")}
                />{" "}
                Usługa
              </label>
              <label htmlFor="part">
                <input
                  type="radio"
                  value="part"
                  name="part"
                  checked={costType === "PART"}
                  onChange={() => setCostType("PART")}
                />{" "}
                Część
              </label>
            </div>
            <div className="flex w-full justify-center">
              <Alert />
            </div>
            <div className="flex w-full justify-center">
              <button
                type="submit"
                className="font-bold uppercase border-2 px-2 m-2 border-black hover:text-white hover:bg-black duration-200"
              >
                Dodaj
              </button>
              <button
                onClick={() => closeToggle(false)}
                className="font-bold uppercase border-2 px-2 m-2 border-red-500 hover:text-white hover:bg-red-500 duration-200"
              >
                Anuluj
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCostModal;
