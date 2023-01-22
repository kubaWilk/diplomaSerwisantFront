import React from "react";

const ButtonApprove = ({ onClick, text }) => {
  return (
    <button
      className="font-bold uppercase border-2 px-2 m-2 border-green-500 hover:bg-green-500 hover:text-white duration-200"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default ButtonApprove;
