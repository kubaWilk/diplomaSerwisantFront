import React from "react";
import PropTypes from "prop-types";

const RepairItem = ({ item }) => {
  return (
    <tr className="even:bg-gray-100">
      <td>{item.id}</td>
      <td>{item.status}</td>
      <td>{item.device.type}</td>
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
