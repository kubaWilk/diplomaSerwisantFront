import React from "react";
import { useEffect } from "react";
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

  //Uploaded Files state
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();
    alert("upload");
  };

  //Handling file event
  const handleFileEvent = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleFileAdd(chosenFiles);
  };

  //Add files to state
  const handleFileAdd = (files) => {
    const uploaded = [...uploadedFiles];
    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
      }
    });
    setUploadedFiles(uploaded);
  };

  const removeFile = (fileNameToRemove) => {
    const temp = uploadedFiles.filter((item) => item.name !== fileNameToRemove);
    setUploadedFiles(temp);
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
        <div className="flex flex-col items-center border-2 p-3 border-dashed rounded-md">
          <label htmlFor="photos" className="p-2">
            Zdjęcia
          </label>
          <label htmlFor="file-upload">
            <a className="block border-2 text-sm border-black p-1 font-bold uppercase text-black bg-white hover:bg-black hover:text-white duration-200 cursor-pointer">
              Dodaj
            </a>
          </label>
          <input
            id="file-upload"
            type="file"
            multiple
            accept=".png,.jpg,.jpeg,.bmp,.pdf"
            className="hidden"
            onChange={handleFileEvent}
          />
          <ul>
            {uploadedFiles.length > 0 &&
              uploadedFiles.map((file) => (
                <li key={file.name}>
                  <a
                    className="px-1 cursor-pointer text-red-600"
                    onClick={() => removeFile(file.name)}
                  >
                    x
                  </a>
                  {file.name} {(file.size / 1024 / 1024).toPrecision(3)}MB
                </li>
              ))}
          </ul>
        </div>

        <button
          type="submit"
          className="text-black border-2 p-2 border-black font-bold hover:text-white hover:bg-black uppercase duration-200 mt-4 px-20"
        >
          Dodaj naprawę
        </button>
      </form>
    </div>
  );
};

export default AddRepair;
