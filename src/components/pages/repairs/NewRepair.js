import React, { useEffect, useState } from "react";
import NewCustomerForm from "./NewCustomerForm";
import NewDeviceForm from "./NewDeviceForm";
import Button from "../../Button";

const NewRepair = () => {
  const [showDeviceForm, setShowDeviceForm] = useState(false);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({});
  const [deviceInfo, setDeviceInfo] = useState({});

  const onSubmit = () => {
    console.log(`
    c: ${customerInfo.choice}
    fN: ${customerInfo.firstName}
    lN: ${customerInfo.lastName}
    pN: ${customerInfo.phoneNumber}
    s: ${customerInfo.street}
    pC: ${customerInfo.postCode}
    c: ${customerInfo.city}

    dC: ${deviceInfo.choice}
    t: ${deviceInfo.type}
    m: ${deviceInfo.manufacturer}
    model: ${deviceInfo.model}
    sN: ${deviceInfo.serialNumber}
    dS: ${deviceInfo.deviceState}
    `);
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <Button
          style="btn"
          onClick={() => {
            setShowDeviceForm(!showDeviceForm);
          }}
          text="Dane urządzenia "
        />

        {showDeviceForm && (
          <NewDeviceForm
            deviceInfo={deviceInfo}
            deviceInfoSetter={setDeviceInfo}
          />
        )}
      </div>

      <div className="form-wrapper">
        <Button
          style="btn"
          onClick={() => {
            setShowCustomerForm(!showCustomerForm);
          }}
          text="Dane klienta"
        />

        {showCustomerForm && (
          <NewCustomerForm
            customerInfo={customerInfo}
            customerInfoSetter={setCustomerInfo}
          />
        )}
      </div>

      <Button
        style="form-wrapper btn"
        onClick={() => onSubmit()}
        text="Wyślij"
      />
    </div>
  );
};

export default NewRepair;
