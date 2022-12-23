import React from "react";
import PropTypes from "prop-types";

const AddButton = ({ onClick }) => {
  return (
    <div className="absolute bottom-10 right-10">
      <i
        onClick={() => onClick()}
        className="fa-solid fa-circle-plus fa-2x cursor-pointer"
      ></i>
    </div>
  );
};

AddButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AddButton;
