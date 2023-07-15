import React, { useState, useEffect, useContext, Fragment } from "react";
import Alert from "../../../components/layout/Alert";
import AlertContext from "../../../context/Alert/AlertContext";
import UserContext from "../../../context/User/UserContext";
import { useNavigate } from "react-router-dom";

const AddUserForm = ({ showToggle }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [postCode, setPostCode] = useState("");
  const [city, setCity] = useState("");
  const [role, setRole] = useState("admin");

  const { setAlert } = useContext(AlertContext);
  const { getUsers, postUser } = useContext(UserContext);

  const inputStyle =
    "border-2 border-gray-400 outline-black rounded-md p-1 px-5";

  const onSubmit = (e) => {
    e.preventDefault();

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

    if (!nameRegex.test(firstName) || firstName === "") {
      setAlert("Nieprawidłowe Imię");
      return;
    }
    if (!nameRegex.test(lastName) || lastName === "") {
      setAlert("Nieprawidłowe Nazwisko");
      return;
    }
    if (!phoneNumberRegex.test(phoneNumber) || phoneNumber === "") {
      setAlert("Nieprawidłowy nr telefonu!");
      return;
    }
    if (!streetRegex.test(street) || street === "") {
      setAlert("Nieprawidłowa ulica");
      return;
    }
    if (!postCodeRegex.test(postCode) || postCode === "") {
      setAlert("Nieprawidłowy kod pocztowy");
      return;
    }
    if (!cityRegex.test(city) || city === "") {
      setAlert("Nieprawidłowe miasto");
      return;
    }

    const newUserData = {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      eMail: email,
      street: street,
      city: city,
      postCode: postCode,
      inAppRole: role,
    };

    postUser(newUserData, role)
      .then(() => {
        getUsers();
        showToggle(false);
      })
      .catch((error) => {
        console.log(error);
        setAlert("Coś poszło nie tak. Spróbuj ponownie.");
      });
  };

  return (
    <Fragment>
      <h2 className="uppercase text-center font-bold m-2 text-lg">
        Dodaj użytkownika
      </h2>
      <form
        className="px-5 flex flex-col items-center justify-center"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col space-y-1">
          <label htmlFor="firstName">
            <p className="form-label">Imię</p>
            <input
              name="firstName"
              className={inputStyle}
              type="text"
              placeholder="Imię"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="lastName">
            <p className="form-label">Nazwisko</p>
            <input
              name="lastName"
              className={inputStyle}
              type="text"
              placeholder="Nazwisko"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="phoneNumber">
            <p className="form-label">Nr kontaktowy</p>
            <input
              name="phoneNumber"
              className={inputStyle}
              type="text"
              placeholder="Nr kontaktowy"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </label>
          <label htmlFor="email">
            <p className="form-label">E - mail</p>
            <input
              name="email"
              className={inputStyle}
              type="text"
              placeholder="E - mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>

        <label className="font-bold text-center uppercase block w-full my-2 border-b border-dotted border-black">
          Adres
        </label>

        <div className="flex flex-col space-y-1">
          <label htmlFor="street">
            <p className="form-label">Ulica</p>
            <input
              name="street"
              className={inputStyle}
              type="text"
              placeholder="Ulica"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </label>
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="postCode">
            <p className="form-label">Kod Pocztowy</p>
            <input
              name="postCode"
              className={inputStyle}
              type="text"
              placeholder="Kod pocztowy"
              value={postCode}
              onChange={(e) => setPostCode(e.target.value)}
            />
          </label>
        </div>
        <div className="flex flex-col space-y-1">
          <label htmlFor="city">
            <p className="form-label">Miasto</p>
            <input
              name="city"
              className={inputStyle}
              type="text"
              placeholder="Miasto"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
        </div>
        <div className="mt-2 space-x-2">
          <label className="font-bold text-sm">
            <p className="uppercase">Uprawnienia:</p>
            <select
              className="custom-select mx-1"
              defaultValue={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="admin">Administrator</option>
              <option value="user">Serwisant</option>
              <option value="customer">Klient</option>
            </select>
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
          onClick={() => showToggle(false)}
        >
          Anuluj
        </button>
      </div>
    </Fragment>
  );
};

export default AddUserForm;
