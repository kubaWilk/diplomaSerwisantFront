import React from "react";
import { useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getDateString } from "../../../../Utils";
import UserContext from "../../../../context/User/UserContext";

const AddNoteModal = ({ closeToggle }) => {
  const [noteMsg, setNoteMsg] = useState("");
  const [noteType, setNoteType] = useState("public");
  const { id } = useParams();
  const { user, isCustomer } = useContext(UserContext);

  const onSubmit = (e) => {
    e.preventDefault();
    axios.post("/notes", {
      repairID: Number(id),
      message: noteMsg,
      createdAt: getDateString(new Date()),
      createdBy: `${user.firstName} ${user.lastName}`,
      visibility: noteType,
    });
    closeToggle(false);
  };

  return (
    <div className="w-screen h-screen z-50 fixed top-0 right-0 bg-gray-200 bg-opacity-70">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="bg-white border-2 border-black p-2 rounded-md">
          <h2 className="uppercase text-center font-bold m-2 text-lg">
            Dodaj notatkę
          </h2>
          <form onSubmit={onSubmit}>
            <div className="flex flex-col">
              <label htmlFor="noteMessage">Treść Notatki</label>
              <textarea
                name="noteMessage"
                value={noteMsg}
                className="border-2 rounded-md p-1 w-[20rem]"
                onChange={(e) => setNoteMsg(e.target.value)}
              />
              {!isCustomer() && (
                <div
                  className="flex space-x-2 justify-center"
                  onChange={(e) => setNoteType(e.target.value)}
                >
                  <label htmlFor="public">
                    <input
                      type="radio"
                      value="public"
                      name="public"
                      checked={noteType === "public"}
                    />
                    Publiczna
                  </label>
                  <label htmlFor="private">
                    <input
                      type="radio"
                      value="private"
                      name="private"
                      checked={noteType === "private"}
                    />{" "}
                    Wewnętrzna
                  </label>
                </div>
              )}
              <div className="flex space-x-2 justify-center w-full">
                <button
                  type="submit"
                  className="font-bold uppercase border-2 px-2 m-2 border-black hover:text-white hover:bg-black duration-200"
                >
                  Dodaj
                </button>
                <button
                  onClick={() => closeToggle(false)}
                  className="font-bold uppercase border-2 px-2 m-2 border-red-500 hover:text-white hover:bg-red-500 duration-200"
                >
                  Anuluj
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNoteModal;
