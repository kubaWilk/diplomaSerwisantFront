import React, { useState } from "react";

const SearchRow = ({ searchCall }) => {
  const inputStyle = "border border-black w-full px-1 rounded-sm";
  const tdStyle = "px-2";
  //state
  const [id, setId] = useState("");
  const [status, setStatus] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const onKeyDown = (e) => {
    let apiCall = "?";

    if (e.key === "Enter") {
      if (id !== "") apiCall = apiCall + `id=${id}`;
      if (status !== "") apiCall = apiCall + `&status=${status}`;
      if (manufacturer !== "")
        apiCall = apiCall + `&manufacturer=${manufacturer}`;
      if (model !== "") apiCall = apiCall + `&model=${model}`;
      if (firstName !== "") apiCall = apiCall + `&firstName=${firstName}`;
      if (lastName !== "") apiCall = apiCall + `&lastName=${lastName}`;

      searchCall(apiCall);
    }
  };

  return (
    <tr className="bg-gray-100">
      <td className={tdStyle}>
        <input
          type="text"
          onKeyDown={(e) => onKeyDown(e)}
          value={id}
          onChange={(e) => setId(e.target.value)}
          className={inputStyle}
          placeholder="ID"
        />
      </td>
      <td className={tdStyle}>
        <input
          type="text"
          onKeyDown={(e) => onKeyDown(e)}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={inputStyle}
          placeholder="Status naprawy"
        />
      </td>
      <td className={tdStyle}>
        <input
          type="text"
          onKeyDown={(e) => onKeyDown(e)}
          value={manufacturer}
          onChange={(e) => setManufacturer(e.target.value)}
          className={inputStyle}
          placeholder="Proucent"
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
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className={inputStyle}
          placeholder="Imię"
        />
      </td>
      <td className={tdStyle}>
        <input
          type="text"
          onKeyDown={(e) => onKeyDown(e)}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className={inputStyle}
          placeholder="Nazwisko"
        />
      </td>
    </tr>
  );
};

export default SearchRow;
