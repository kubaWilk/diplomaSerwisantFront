import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { NavLink, useNavigate } from "react-router-dom";
import { translateRepairStatus } from "../../../Utils";

const RepairItem = ({ item }) => {
  const navigate = useNavigate();

  return (
    <tr
      className="odd:bg-gray-100 hover:bg-gray-300"
      onClick={() => {
        navigate(`/app/repairs/${item.id}`);
      }}
    >
      <td>{item.id}</td>
      <td>{translateRepairStatus(item.repairStatus)}</td>
      <td>{item.device.manufacturer}</td>
      <td>{item.device.model}</td>
      <td>{item.issuer.userInfo.firstName}</td>
      <td>{item.issuer.userInfo.lastName}</td>
    </tr>
  );
};

RepairItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default RepairItem;
