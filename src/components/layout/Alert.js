import React, { useContext } from "react";
import AlertContext from "../../context/Alert/AlertContext";

function Alert() {
  const { message, color } = useContext(AlertContext);

  return (
    <div className={`mt-3 text-md font-bold text-${color}-600`}>{message}</div>
  );
}

export default Alert;
