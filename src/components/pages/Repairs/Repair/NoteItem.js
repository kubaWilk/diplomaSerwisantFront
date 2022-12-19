import React, { useState } from "react";
import Dialog from "../../../layout/Dialog";

const NoteItem = ({ note, onDelete }) => {
  const { message, createdAt, createdBy } = note;
  const [deleteDialogToggle, setDeleteDialogToggle] = useState(false);

  return (
    <div className="w-[80%] rounded-md min-height-[20px] p-2 border-2 border-black relative">
      {deleteDialogToggle && (
        <Dialog
          prompt="Czy chcesz usunąć notatkę?"
          onApprove={() => {
            onDelete(note);
            setDeleteDialogToggle(false);
          }}
          onCancel={() => setDeleteDialogToggle(false)}
        />
      )}
      <div
        className="top-0 right-1 absolute cursor-pointer"
        onClick={() => {
          setDeleteDialogToggle(true);
        }}
      >
        <i className="fa-regular fa-trash-can text-black"></i>
      </div>
      <p>{message}</p>
      <div className="w-full border-b border-black border-dotted my-1"></div>
      <div className="flex">
        <p className="text-sm">
          Dodana: {createdAt} przez {createdBy}{" "}
        </p>
      </div>
    </div>
  );
};

export default NoteItem;
