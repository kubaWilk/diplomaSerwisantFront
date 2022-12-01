import React from "react";
import { useState } from "react";
import SectionName from "../../../layout/SectionName";
import FormGroup from "./FormGroup";

const AddRepair = () => {
  // Customer state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("");

  // Device state
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [stateAtArrival, setStateAtArrival] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col w-full items-center">
      <SectionName text="Nowa naprawa" />

      <form className="flex w-full flex-col items-center" onSubmit={onSubmit}>
        <h3 className="text-lg text-center m-1 mb-4 w-80">Dane Klienta</h3>
        <div className="flex w-full justify-center">
          <div>
            <FormGroup
              htmlFor="firstName"
              label="Imię"
              value={firstName}
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <FormGroup
              htmlFor="lastName"
              label="Nazwisko"
              value={lastName}
              type="text"
              onChange={(e) => setLastName(e.target.value)}
            />
            <FormGroup
              htmlFor="phoneNumber"
              label="Nr telefonu"
              value={phoneNumber}
              type="text"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div>
            <FormGroup
              htmlFor="street"
              label="Ulica"
              value={street}
              type="text"
              onChange={(e) => setStreet(e.target.value)}
            />
            <FormGroup
              htmlFor="city"
              label="Miasto"
              value={city}
              type="text"
              onChange={(e) => setCity(e.target.value)}
            />
            <FormGroup
              htmlFor="postCode"
              label="Kod pocztowy"
              value={postCode}
              type="text"
              onChange={(e) => setPostCode(e.target.value)}
            />
          </div>
        </div>

        <h3 className="text-lg text-center m-1 mb-4 w-80">Dane Sprzętu</h3>
        <div className="flex w-full justify-center">
          <div>
            <FormGroup
              htmlFor="manufacturer"
              label="Producent"
              value={manufacturer}
              type="text"
              onChange={(e) => setManufacturer(e.target.value)}
            />
            <FormGroup
              htmlFor="model"
              label="Model"
              value={model}
              type="text"
              onChange={(e) => setModel(e.target.value)}
            />
          </div>
          <div>
            <FormGroup
              htmlFor="serialNumber"
              label="Nr seryjny"
              value={serialNumber}
              type="text"
              onChange={(e) => setSerialNumber(e.target.value)}
            />
            <FormGroup
              htmlFor="stateAtArrival"
              label="Stan przy przyjęciu"
              value={stateAtArrival}
              type="text"
              onChange={(e) => setStateAtArrival(e.target.value)}
            />
          </div>
        </div>
        <button
          type="submit"
          className="text-black border-2 p-2 border-black font-bold hover:text-white hover:bg-black uppercase duration-200 mt-4 px-20"
        >
          Dodaj
        </button>
      </form>
    </div>
  );
};

export default AddRepair;
