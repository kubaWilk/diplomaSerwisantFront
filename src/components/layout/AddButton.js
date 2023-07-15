import React from "react";
import PropTypes from "prop-types";

const AddButton = ({ onClick }) => {
  return (
    <div data-testid="addButton" className="absolute bottom-10 right-10">
      <i
        onClick={() => onClick()}
        data-testid="addButtonIcon"
        className="fa-solid fa-circle-plus fa-2x cursor-pointer"
      ></i>
    </div>
  );
};

AddButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AddButton;
