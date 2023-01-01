import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const RepairItem = ({ item }) => {
  const navigate = useNavigate();

  return (
    <tr
      className="odd:bg-gray-100 hover:bg-gray-300"
      onDoubleClick={() => {
        navigate(`/repairs/${item.id}`);
      }}
    >
      <td>{item.id}</td>
      <td>{item.status}</td>
      <td>{item.device.manufacturer}</td>
      <td>{item.device.model}</td>
      <td>{item.customer.firstName}</td>
      <td>{item.customer.lastName}</td>
    </tr>
  );
};

RepairItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default RepairItem;
