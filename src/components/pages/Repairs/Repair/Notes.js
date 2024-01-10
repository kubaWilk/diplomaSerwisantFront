import axios from "axios";
import React, { useCallback, useContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SectionName from "../../../layout/SectionName";
import NoteItem from "./NoteItem";
import Loading from "../../../layout/Loading";
import { Link } from "react-router-dom";
import AddNoteModal from "./AddNoteModal";
import AddButton from "../../../layout/AddButton";
import { Config } from "../../../../config";
import UserContext from "../../../../context/User/UserContext";
import AlertContext from "../../../../context/Alert/AlertContext";
import Alert from "../../../layout/Alert";

const Notes = () => {
  const { id } = useParams();
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addNoteDialogToggle, setAddNoteDialogToggle] = useState(false);
  const navigate = useNavigate();
  const {
    user: { jwt: token },
  } = useContext(UserContext);

  const { setAlert } = useContext(AlertContext);

  const getNotes = useCallback(async () => {
    const res = await axios
      .get(`${Config.apiUrl}/note/all?repairid=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((e) => {
        if (e.code === "ERR_NETWORK") setAlert("Błąd połączenia z serwerem.");
      });

    setIsLoading(false);
    setNotes(res.data);
  }, [token, setNotes, setIsLoading, setAlert]);

  useEffect(() => {
    getNotes();
    //eslint-disable-next-line
  }, [getNotes]);

  useEffect(() => {
    if (addNoteDialogToggle === false) {
      setIsLoading(true);
      getNotes();
    }
    //eslint-disable-next-line
  }, [addNoteDialogToggle]);

  const removeNote = async (note) => {
    await axios
      .delete(`${Config.apiUrl}/note/${note.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status === 200) {
          getNotes();
        }
      })
      .catch((e) => {
        if (e.code === "ERR_NETWORK") setAlert("Błąd połączenia z serwerem.");
      });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="flex w-full h-full flex-col items-center justify-start">
        <SectionName text={`Naprawa #${id}`} />
        <Alert />
        <h2 className="uppercase text-xl">Notatki</h2>
        <Link className="text-sm" onClick={() => navigate(-1)}>
          Powrót
        </Link>
        <div className="flex flex-col w-full items-center space-y-2 mt-3">
          {notes.map((note) => (
            <NoteItem key={note.id} note={note} onDelete={removeNote} />
          ))}
        </div>
      </div>
      <AddButton onClick={() => setAddNoteDialogToggle(true)} />
      {addNoteDialogToggle && (
        <AddNoteModal closeToggle={setAddNoteDialogToggle} />
      )}
    </div>
  );
};

export default Notes;
