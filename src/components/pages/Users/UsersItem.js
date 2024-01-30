import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const UsersItem = ({ item }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { firstName, lastName, city, postCode, phoneNumber } = item.userInfo;

  return (
    <tr
      onClick={() => navigate(`${pathname}/${item.id}`)}
      className="odd:bg-gray-100 hover:bg-gray-300"
    >
      <td>{item.id}</td>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{city ? city : "Brak"}</td>
      <td>{postCode ? postCode : "Brak"}</td>
      <td>{phoneNumber ? phoneNumber : "Brak"}</td>
    </tr>
  );
};

export default UsersItem;
