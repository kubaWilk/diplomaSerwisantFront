import axios from "axios";
import React from "react";

const NoteItem = ({ note, onXClick }) => {
  const { message, createdAt, createdBy } = note;

  return (
    <div className="w-[80%] rounded-md min-height-[20px] p-2 border border-black relative">
      <div
        className="top-0 right-1 text-red-400 absolute cursor-pointer"
        onClick={() => {
          onXClick(note);
          alert("Notatka usunięta");
        }}
      >
        X
      </div>
      <p>{message}</p>
      <div className="w-full border-b border-black border-dotted m-2"></div>
      <div className="flex">
        <p className="text-sm">
          Dodana: {createdAt} przez {createdBy}{" "}
        </p>
      </div>
    </div>
  );
};

export default NoteItem;
