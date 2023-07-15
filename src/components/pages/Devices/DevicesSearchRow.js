import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

const DevicesSearchRow = ({ searchCall }) => {
  const [deviceId, setDeviceId] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const [serialNumber, setSerialNumber] = useState("");

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      searchCall({
        id: deviceId,
        manufacturer: manufacturer,
        model: model,
        serialNumber: serialNumber,
      });
    }
  };

  const tdStyle = "px-2";
  const inputStyle = "border border-black w-full px-1 rounded-sm";

  return (
    <tr className="bg-gray-100">
      <td className={tdStyle}>
        <input
          type="text"
          onKeyDown={(e) => onKeyDown(e)}
          value={deviceId}
          onChange={(e) => setDeviceId(e.target.value)}
          className={inputStyle}
          placeholder="ID"
        />
      </td>
      <td className={tdStyle}>
        <input
          type="text"
          onKeyDown={(e) => onKeyDown(e)}
          value={manufacturer}
          onChange={(e) => setManufacturer(e.target.value)}
          className={inputStyle}
          placeholder="Producent"
        />
      </td>
      <td className={tdStyle}>
        <input
          type="text"
          onKeyDown={(e) => onKeyDown(e)}
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className={inputStyle}
          placeholder="Model"
        />
      </td>
      <td className={tdStyle}>
        <input
          type="text"
          onKeyDown={(e) => onKeyDown(e)}
          value={serialNumber}
          onChange={(e) => setSerialNumber(e.target.value)}
          className={inputStyle}
          placeholder="Nr seryjny"
        />
      </td>
    </tr>
  );
};

DevicesSearchRow.propTypes = {
  searchCall: PropTypes.func.isRequired,
};

export default DevicesSearchRow;
