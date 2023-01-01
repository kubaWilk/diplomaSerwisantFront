import React, { useState } from "react";

const UserSearchRow = ({ searchCall }) => {
  const [userID, setUserID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const inputStyle = "border border-black w-full px-1 rounded-sm";
  const tdStyle = "px-2";

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      searchCall({
        id: userID,
        firstName: firstName,
        lastName: lastName,
        city: city,
        postCode: postCode,
        phoneNumber: phoneNumber,
      });
    }
  };

  return (
    <tr className="bg-gray-100">
      <td className={tdStyle}>
        <input
          type="text"
          onKeyDown={(e) => onKeyDown(e)}
          value={userID}
          onChange={(e) => setUserID(e.target.value)}
          className={inputStyle}
          placeholder="ID"
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
      <td className={tdStyle}>
        <input
          type="text"
          onKeyDown={(e) => onKeyDown(e)}
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className={inputStyle}
          placeholder="Miasto"
        />
      </td>
      <td className={tdStyle}>
        <input
          type="text"
          onKeyDown={(e) => onKeyDown(e)}
          value={postCode}
          onChange={(e) => setPostCode(e.target.value)}
          className={inputStyle}
          placeholder="Kod pocztowy"
        />
      </td>
      <td className={tdStyle}>
        <input
          type="text"
          onKeyDown={(e) => onKeyDown(e)}
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className={inputStyle}
          placeholder="Nr kontaktowy"
        />
      </td>
    </tr>
  );
};

export default UserSearchRow;
