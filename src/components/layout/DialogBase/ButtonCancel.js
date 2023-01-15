import React from "react";

const ButtonCancel = ({ onCancel, text }) => {
  return (
    <button
      className="font-bold uppercase border-2 px-2 m-2 border-red-500 hover:bg-red-500 hover:text-white duration-200"
      onClick={onCancel}
    >
      {text}
    </button>
  );
};

export default ButtonCancel;
