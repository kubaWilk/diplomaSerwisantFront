import React from "react";
import { useNavigate } from "react-router-dom";

const UsersItem = ({ item, displayCust }) => {
  const navigate = useNavigate();
  return (
    <tr
      onDoubleClick={() => navigate(`/user/${item.id}`)}
      className="odd:bg-gray-100 hover:bg-gray-300"
    >
      <td>{item.id}</td>
      {!displayCust && <td>{item.role}</td>}
      <td>{item.firstName}</td>
      <td>{item.lastName}</td>
      <td>{item.city}</td>
      <td>{item.postCode}</td>
      <td>{item.phoneNumber}</td>
    </tr>
  );
};

export default UsersItem;
