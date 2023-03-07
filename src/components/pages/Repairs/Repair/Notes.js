import axios from "axios";
import React, { useContext, useEffect } from "react";
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

const Notes = () => {
  const { id } = useParams();
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addNoteDialogToggle, setAddNoteDialogToggle] = useState(false);
  const navigate = useNavigate();
  const {
    user: { jwt: token },
  } = useContext(UserContext);
  const apiCall = `${Config.apiUrl}/api/notes?filters[repairID][$eq]=${id}`;

  const getNotes = async () => {
    const res = await axios.get(apiCall, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setNotes(res.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getNotes();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    getNotes();
    //eslint-disable-next-line
  }, [addNoteDialogToggle]);

  const removeNote = (note) => {
    axios.delete(`${Config.apiUrl}/api/notes/${note.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setNotes(notes.filter((e) => e !== note));
  };

  if (isLoading) return <Loading />;

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="flex w-full h-full flex-col items-center justify-start">
        <SectionName text={`Naprawa #${id}`} />
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
        <AddNoteModal
          closeToggle={setAddNoteDialogToggle}
          notes={notes}
          notesSetter={setNotes}
        />
      )}
    </div>
  );
};

export default Notes;
