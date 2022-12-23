import React, { useContext } from "react";
import AlertContext from "../../context/Alert/AlertContext";

const Alert = () => {
  const { message } = useContext(AlertContext);

  return <div className="mt-3 text-md font-bold text-red-600">{message}</div>;
};

export default Alert;
