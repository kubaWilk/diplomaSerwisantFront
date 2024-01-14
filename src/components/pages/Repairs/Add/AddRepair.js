import React, { useEffect } from "react";
import { useState, useContext } from "react";
import Alert from "../../../layout/Alert";
import SectionName from "../../../layout/SectionName";
import UploadFiles from "../../../layout/UploadFiles";
import FormGroup from "./FormGroup";
import UserContext from "../../../../context/User/UserContext";
import SingleRepairContext from "../../../../context/SingleRepair/SingleRepairContext";
import { useNavigate } from "react-router-dom";
import AlertContext from "../../../../context/Alert/AlertContext";
import SearchTable from "./SearchTable";
import axios from "axios";
import { Config } from "../../../../config";

const AddRepair = () => {
  const { postRepair } = useContext(SingleRepairContext);
  const navigate = useNavigate();
  const { setAlert } = useContext(AlertContext);
  const { getToken } = useContext(UserContext);
  const token = getToken();

  const [isNewCustomer, setIsNewCustomer] = useState(true);
  const [isNewDevice, setIsNewDevice] = useState(true);
  const [shouldShowCustomerTable, setShouldShowCustomerTable] = useState(false);
  const [shouldShowDeviceTable, setShouldShowDeviceTable] = useState(false);
  const [repairDescription, setRepairDescription] = useState("");
  const [estimatedCost, setEstimatedCost] = useState(0);

  // Customer state
  const [customer, setCustomer] = useState({
    username: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    eMail: "",
    street: "",
    city: "",
    postCode: "",
  });

  const onCustomerChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  // Device state
  const [device, setDevice] = useState({
    manufacturer: "",
    model: "",
    serialNumber: "",
  });

  //Submit method state
  const [customerId, setCustomerId] = useState();
  const [deviceId, setDeviceId] = useState();
  const [customerData, setCustomerData] = useState();
  const [deviceData, setDeviceData] = useState();

  const onDeviceChange = (e) => {
    setDevice({ ...device, [e.target.name]: e.target.value });
  };

  //Uploaded Files state
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const deviceTableProperties = {
    manufacturer: "Producent",
    serialNumber: "Numer Seryjny",
    model: "Model",
    stateAtArrival: "Stan przy przyjęciu",
  };

  const customerTableProperties = {
    firstName: "Imię",
    lastName: "Nazwisko",
    phoneNumber: "Nr Telefonu",
    email: "E - Mail",
    street: "Ulica",
    city: "Miasto",
    postCode: "Kod Pocztowy",
  };

  const postUser = async (user) => {
    const {
      username,
      city,
      eMail,
      firstName,
      lastName,
      phoneNumber,
      postCode,
      street,
    } = user;

    const datatoPost = {
      username: username,
      email: eMail,
      userInfo: {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        postCode: postCode,
        street: street,
        city: city,
      },
    };

    return await axios
      .post(
        `${Config.apiUrl}/user/`,
        { ...datatoPost },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .catch((error) => {
        console.log(error);
        if (
          error.response.data.message ===
          "User with given username already exists!"
        ) {
          setAlert("Istnieje użytkownik z podanym loginem");
        }
        if (
          error.response.data.message ===
          "User has to have a unique e-mail address!"
        ) {
          setAlert("Istnieje użytkownik z podanym adresem e-mail");
        }
      });
  };

  const postDevice = async (device) => {
    return await axios
      .post(
        `${Config.apiUrl}/device/`,
        { ...device },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .catch((error) => {
        console.log(error);
        const message = error.response.data.message;

        if (message === "Device with given serial number already exists!") {
          setAlert(
            "Urządzenie o wskazanym nr seryjnym już istnieje w systemie."
          );
        }
      });
  };

  const checkInput = () => {
    if (customerId === undefined) {
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

      if (!nameRegex.test(customer.firstName) || customer.firstName === "") {
        setAlert("Nieprawidłowe Imię");
        return true;
      }

      if (!nameRegex.test(customer.lastName) || customer.lastName === "") {
        setAlert("Nieprawidłowe Nazwisko");
        return true;
      }

      if (
        !phoneNumberRegex.test(customer.phoneNumber) ||
        customer.phoneNumber === ""
      ) {
        setAlert("Nieprawidłowy nr telefonu!");
        return true;
      }

      if (!streetRegex.test(customer.street) || customer.street === "") {
        setAlert("Nieprawidłowa ulica");
        return true;
      }

      if (!postCodeRegex.test(customer.postCode) || customer.postCode === "") {
        setAlert("Nieprawidłowy kod pocztowy");
        return true;
      }

      if (!cityRegex.test(customer.city) || customer.city === "") {
        setAlert("Nieprawidłowe miasto");
        return true;
      }
    }

    if (deviceId === undefined) {
      if (device.manufacturer === "") {
        setAlert("Należy podać producenta urządzenia");
        return true;
      }

      if (device.serialNumber === "") {
        setAlert("Należy podać numer seryjny urządzenia");
        return true;
      }

      if (device.model === "") {
        setAlert("Należy podać model urządzenia");
        return true;
      }
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // if (checkInput()) return;

    let newCustomerId = 0;
    let newDeviceId = 0;

    if (isNewCustomer) {
      if (customer.username === "") {
        setCustomer({
          ...customer,
          username: `${customer.firstName}.${customer.lastName}`.toLowerCase(),
        });
      }

      const response = await postUser(customer);
      newCustomerId = response.data.id;
      setIsNewCustomer(false);
    }

    if (isNewDevice) {
      const response = await postDevice(device, token);
      newDeviceId = response.data.id;
    }

    let formData = new FormData();
    uploadedFiles.forEach((file) => formData.append("files", file));

    const repair = {
      issuer: isNewCustomer ? newCustomerId : customerId,
      device: isNewDevice ? newDeviceId : deviceId,
      description: repairDescription,
      estimatedCost: estimatedCost,
      // photos: uploadedFiles.length !== 0 ? formData : null,
    };

    await postRepair(repair, token)
      .then((res) => {
        if (res.status === 200) navigate(-1);
      })
      .catch((e) => {
        setAlert("Coś poszło nie tak!");
        console.log(e);
      });
  };

  const onCustomerSearch = async () => {
    const dataSearch = {
      username: customer.username !== "" ? customer.username : "",
      eMail: customer.eMail !== "" ? customer.eMail : "",
    };

    await axios
      .post(
        `${Config.apiUrl}/user/search`,
        { ...dataSearch },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        if (res.data.length > 0) {
          const result = res.data.map((user) => {
            const userInfo = user.userInfo;

            return {
              id: user.id,
              firstName: userInfo.firstName,
              lastName: userInfo.lastName,
              phoneNumber: userInfo.phoneNumber,
              email: user.email,
              street: userInfo.street,
              city: userInfo.city,
              postCode: userInfo.postCode,
            };
          });

          setCustomerData(result);
          setShouldShowCustomerTable(true);
        }

        if (res.data.length <= 0) {
          setCustomerData();
          setShouldShowCustomerTable(false);
          setAlert("Nie znaleziono klientów");
        }
      })
      .catch((e) => console.log(e));
  };

  const onDeviceSearch = async () => {
    await axios
      .post(
        `${Config.apiUrl}/device/search`,
        { serialNumber: device.serialNumber },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        if (res.data) {
          setDeviceData(Array.of({ ...res.data }));
          setShouldShowDeviceTable(true);
        }

        if (res.data.length <= 0) {
          setAlert("Nie znaleziono urządzeń");
        }
      })
      .catch((error) => {
        setDeviceData();
        setShouldShowDeviceTable(false);
        if (
          error.response.data.message ===
          "No device found with given serialNumber!"
        )
          setAlert("Nie znaleziono urządzeń!");
      });
  };

  return (
    <div className="flex flex-col w-full items-center">
      <SectionName text="Nowa naprawa" />

      <form className="flex w-full flex-col items-center" onSubmit={onSubmit}>
        <h3 className="text-lg text-center m-1 mb-4 w-80">Dane Klienta</h3>
        <div className="flex space-x-2 justify-center">
          <label htmlFor="newCustomer">
            <input
              type="radio"
              id="newCustomer"
              value="newCustomer"
              name="customerType"
              defaultChecked
              onChange={() => {
                setIsNewCustomer(true);
                setShouldShowCustomerTable(false);
              }}
            />
            Nowy
          </label>
          <label htmlFor="existingCustomer">
            <input
              id="existingCustomer"
              type="radio"
              value="existingCustomer"
              name="customerType"
              onChange={() => {
                setIsNewCustomer(false);
                customerData !== undefined && setShouldShowCustomerTable(true);
              }}
            />
            Istniejący
          </label>
        </div>
        <div className="flex w-full justify-center">
          <div>
            {isNewCustomer && (
              <>
                <FormGroup
                  htmlFor="firstName"
                  label="Imię"
                  value={customer.firstName}
                  type="text"
                  name="firstName"
                  onChange={(e) => {
                    onCustomerChange(e);
                  }}
                />
                <FormGroup
                  htmlFor="lastName"
                  label="Nazwisko"
                  value={customer.lastName}
                  type="text"
                  name="lastName"
                  onChange={(e) => onCustomerChange(e)}
                />
                <FormGroup
                  htmlFor="phoneNumber"
                  label="Nr telefonu"
                  value={customer.phoneNumber}
                  type="text"
                  name="phoneNumber"
                  onChange={(e) => onCustomerChange(e)}
                />
              </>
            )}
            <FormGroup
              htmlFor="eMail"
              label="E - Mail"
              value={customer.eMail}
              type="text"
              name="eMail"
              onChange={(e) => onCustomerChange(e)}
            />
          </div>
          <div>
            {isNewCustomer && (
              <>
                <FormGroup
                  htmlFor="street"
                  label="Ulica"
                  value={customer.street}
                  type="text"
                  name="street"
                  onChange={(e) => onCustomerChange(e)}
                />
                <FormGroup
                  htmlFor="city"
                  label="Miasto"
                  value={customer.city}
                  type="text"
                  name="city"
                  onChange={(e) => onCustomerChange(e)}
                />
                <FormGroup
                  htmlFor="postCode"
                  label="Kod pocztowy"
                  value={customer.postCode}
                  type="text"
                  name="postCode"
                  onChange={(e) => onCustomerChange(e)}
                />
              </>
            )}
            <FormGroup
              htmlFor="username"
              label="Login"
              value={customer.username}
              type="text"
              name="username"
              onChange={(e) => onCustomerChange(e)}
            />
          </div>
        </div>

        {shouldShowCustomerTable && (
          <SearchTable
            name="customerSearch"
            tableProperties={customerTableProperties}
            tableData={customerData}
            idSetter={setCustomerId}
          />
        )}

        {!isNewCustomer && (
          <button
            type="button"
            onClick={() => onCustomerSearch()}
            className="text-black text-sm border-2 p-2 border-black font-bold hover:text-white hover:bg-black uppercase duration-200"
          >
            Znajdź klientów
          </button>
        )}

        <h3 className="text-lg text-center m-1 mb-4 w-80">Dane Sprzętu</h3>
        <div className="flex space-x-2 justify-center">
          <label htmlFor="newDevice">
            <input
              type="radio"
              value="newDevice"
              id="newDevice"
              name="deviceType"
              defaultChecked
              onChange={() => {
                setIsNewDevice(true);
                setShouldShowDeviceTable(false);
              }}
            />
            Nowy
          </label>
          <label htmlFor="existingDevice">
            <input
              type="radio"
              id="existingDevice"
              value="existingDevice"
              name="deviceType"
              onChange={() => {
                setIsNewDevice(false);
                deviceData !== undefined && setShouldShowDeviceTable(true);
              }}
            />
            Istniejący
          </label>
        </div>
        <div className="flex w-full justify-center">
          <div>
            {isNewDevice && (
              <>
                <FormGroup
                  htmlFor="manufacturer"
                  label="Producent"
                  value={device.manufacturer}
                  type="text"
                  name="manufacturer"
                  onChange={(e) => onDeviceChange(e)}
                />
                <FormGroup
                  htmlFor="model"
                  label="Model"
                  value={device.model}
                  type="text"
                  name="model"
                  onChange={(e) => onDeviceChange(e)}
                />
              </>
            )}
          </div>
          <div>
            <FormGroup
              htmlFor="serialNumber"
              label="Nr seryjny"
              value={device.serialNumber}
              type="text"
              name="serialNumber"
              onChange={(e) => onDeviceChange(e)}
            />
          </div>
        </div>

        {!isNewDevice && (
          <button
            type="button"
            onClick={() => onDeviceSearch()}
            className="text-black text-sm border-2 p-2 border-black font-bold hover:text-white hover:bg-black uppercase duration-200"
          >
            Znajdź urządzeniaa
          </button>
        )}

        {shouldShowDeviceTable && (
          <SearchTable
            name="deviceSearch"
            tableProperties={deviceTableProperties}
            tableData={deviceData}
            idSetter={setDeviceId}
          />
        )}

        <div className="flex flex-col w-[55%]">
          <div>
            <label className="self-start ml-2 mb-1" htmlFor="">
              Opis usterki
            </label>
          </div>
          <div>
            <textarea
              id="repairDescription"
              name="repairDescription"
              rows="4"
              className="border p-2 mt-2 w-full"
              onChange={(e) => setRepairDescription(e.target.value)}
            />
            <FormGroup
              htmlFor="estimatedCost"
              label="Przewidywany koszt"
              value={estimatedCost}
              type="text"
              name="estimatedCost"
              onChange={(e) => {
                setEstimatedCost(e.target.value);
              }}
            />
          </div>
        </div>

        {/* <UploadFiles formState={{ uploadedFiles, setUploadedFiles }} /> */}

        <Alert />
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
