import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AdminUserItem = ({ item }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { username, email } = item;
  const { firstName, lastName, city, postCode, phoneNumber } = item.userInfo;

  const getUserUserRole = (user) => {
    const rolesString = user.roles.join(", ");
    if (rolesString.includes("ROLE_ADMIN")) return "Administrator";
    if (rolesString.includes("ROLE_EMPLOYEE")) return "Pracownik serwisu";
    if (rolesString.includes("ROLE_CUSTOMER")) return "Klient";
  };

  return (
    <tr
      onClick={() => navigate(`${pathname}/${item.id}`)}
      className="odd:bg-gray-100 hover:bg-gray-300"
    >
      <td>{item.id}</td>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{username ? username : "Brak"}</td>
      <td>{email ? email : "Brak"}</td>
      <td>{getUserUserRole(item) ? getUserUserRole(item) : "Brak"}</td>
    </tr>
  );
};

export default AdminUserItem;
