import React, { useState, useEffect, useContext, Fragment } from "react";
import { useParams } from "react-router-dom";
import AlertContext from "../../../../context/Alert/AlertContext";
import Alert from "../../../layout/Alert";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditUserForm = ({ userData }) => {
  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber);
  const [street, setStreet] = useState(userData.street);
  const [postCode, setPostCode] = useState(userData.postCode);
  const [city, setCity] = useState(userData.city);

  const { setAlert } = useContext(AlertContext);
  const { id } = useParams();

  const navigate = useNavigate();

  const inputStyle =
    "border-2 border-gray-400 outline-black rounded-md p-1 px-5";

  const onSubmit = (e) => {
    // e.preventDefault();

    //prettier-ignore
    const phoneNumberRegex = new RegExp("^[\+]?([0-9]{2})?([0-9]{9,12})$");
    //prettier-ignore
    const nameRegex = new RegExp("^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$")
    //prettier-ignore
    const streetRegex = new RegExp("^[A-Źa-ź0-9 /]+$")
    //prettier-ignore
    const postCodeRegex = new RegExp("^[0-9]{2}[-][0-9]{3}$")
    //prettier-ignore
    const cityRegex = new RegExp("^[A-Źa-ź ]+$");

    if (!nameRegex.test(firstName) || firstName === "")
      setAlert("Nieprawidłowe Imię");
    else if (!nameRegex.test(lastName) || firstName === "")
      setAlert("Nieprawidłowe Nazwisko");
    else if (!phoneNumberRegex.test(phoneNumber) || phoneNumber === "")
      setAlert("Nieprawidłowy nr telefonu!");
    else if (!streetRegex.test(street) || street === "")
      setAlert("Nieprawidłowa ulica");
    else if (!postCodeRegex.test(postCode) || postCode === "")
      setAlert("Nieprawidłowy kod pocztowy");
    else if (!cityRegex.test(city) || city === "")
      setAlert("Nieprawidłowe miasto");
    else {
      const postUser = {
        ...userData,
        id: Number.parseInt(id),
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        street: street,
        city: city,
        postCode: postCode,
      };
      axios
        .put(`/users/${id}`, postUser)
        .catch((e) => console.log(e))
        .finally(navigate(-1));
    }
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
            htmlFor="firstName"
            className="text-center font-bold uppercase"
          >
            Imię
          </label>
          <input
            name="firstName"
            className={inputStyle}
            type="text"
            placeholder="Imię"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="lastName" className="text-center font-bold uppercase">
            Nazwisko
          </label>
          <input
            name="lastName"
            className={inputStyle}
            type="text"
            placeholder="Nazwisko"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label
            htmlFor="phoneNumber"
            className="text-center font-bold uppercase"
          >
            Nr kontaktowy
          </label>
          <input
            name="phoneNumber"
            className={inputStyle}
            type="text"
            placeholder="Nazwisko"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <label className="font-bold text-center uppercase block w-full my-2 border-b border-dotted border-black">
          Adres
        </label>

        <div className="flex flex-col space-y-1">
          <label htmlFor="street" className="text-center font-bold uppercase">
            Ulica
          </label>
          <input
            name="street"
            className={inputStyle}
            type="text"
            placeholder="Nazwisko"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="postCode" className="text-center font-bold uppercase">
            Kod Pocztowy
          </label>
          <input
            name="postCode"
            className={inputStyle}
            type="text"
            placeholder="Nazwisko"
            value={postCode}
            onChange={(e) => setPostCode(e.target.value)}
          />
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="city" className="text-center font-bold uppercase">
            Miasto
          </label>
          <input
            name="city"
            className={inputStyle}
            type="text"
            placeholder="Nazwisko"
            value={city}
            onChange={(e) => setCity(e.target.value)}
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

export default EditUserForm;
