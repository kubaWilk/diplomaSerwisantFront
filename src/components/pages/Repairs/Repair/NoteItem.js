import React, { Fragment, useEffect, useState } from "react";
import { useContext } from "react";
import UserContext from "../../../../context/User/UserContext";
import Dialog from "../../../layout/Dialog";

const NoteItem = ({ note, onDelete }) => {
  const { message, author } = note;

  const [deleteDialogToggle, setDeleteDialogToggle] = useState(false);
  const { isCustomer } = useContext(UserContext);

  const isNotePublic = () => {
    return note.visibility === "PUBLIC";
  };

  useEffect(() => {}, []);

  const publicStyles =
    "w-[80%] rounded-md min-height-[20px] p-2 border-2 border-black relative";
  const privateStyles =
    "w-[80%] rounded-md min-height-[20px] p-2 border-2 border-black relative bg-gray-300";

  if (isCustomer() && !isNotePublic()) return <></>;

  return (
    <div className={isNotePublic() ? publicStyles : privateStyles}>
      {deleteDialogToggle && (
        <Dialog
          prompt="Czy chcesz usunąć notatkę?"
          onApprove={async () => {
            await onDelete(note);
            setDeleteDialogToggle(false);
          }}
          onCancel={() => setDeleteDialogToggle(false)}
        />
      )}
      {!isCustomer() && (
        <div
          className="top-0 right-1 absolute cursor-pointer"
          onClick={() => {
            setDeleteDialogToggle(true);
          }}
        >
          <i className="fa-regular fa-trash-can text-black"></i>
        </div>
      )}
      <p>{message}</p>
      <div className="w-full border-b border-black border-dotted my-1"></div>
      <div className="flex justify-between">
        <p className="text-sm">
          Dodana przez{" "}
          {author?.userDetails?.firstName && author?.userDetails?.lastName
            ? `${author.userDetails.firstName} ${author.userDetails.lastName}`
            : "Unknown User"}
        </p>
        {!isNotePublic() && <p className="text-sm uppercase">wewnętrzna</p>}
      </div>
    </div>
  );
};

export default NoteItem;
