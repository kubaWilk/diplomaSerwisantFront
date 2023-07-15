import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const DeviceItem = ({ item }) => {
  const navigate = useNavigate();

  return (
    <tr
      className="odd:bg-gray-100 hover:bg-gray-300"
      onClick={() => {
        navigate(`/devices/${item.id}/summary`);
      }}
    >
      <td>{item.id}</td>
      <td>{item.manufacturer}</td>
      <td>{item.model}</td>
      <td>{item.serialNumber}</td>
    </tr>
  );
};

DeviceItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default DeviceItem;
