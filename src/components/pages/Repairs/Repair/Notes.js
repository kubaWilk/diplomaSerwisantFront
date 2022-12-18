import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SectionName from "../../../layout/SectionName";
import NoteItem from "./NoteItem";
import Loading from "../../../layout/Loading";
import { Link } from "react-router-dom";

const Notes = () => {
  const { id } = useParams();
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getNotes = async () => {
      const res = await axios.get("/notes");

      setNotes(res.data);
      setIsLoading(false);
    };

    getNotes();
  }, []);

  const removeNote = (note) => {
    axios.delete(`/notes/${note.id}`);
    setNotes(notes.filter((e) => e !== note));
  };

  if (isLoading) return <Loading />;

  return (
    <div className="w-full h-full flex-col content-between">
      <div className="flex w-full flex-col items-center justify-start">
        <SectionName text={`Naprawa #${id}`} />
        <h2 className="uppercase text-xl">Notatki</h2>
        <Link className="text-sm" onClick={() => navigate(-1)}>
          Powrót
        </Link>
        <div className="flex flex-col w-full items-center space-y-2 mt-3">
          {notes.map((note) => (
            <NoteItem key={note.id} note={note} onXClick={removeNote} />
          ))}
        </div>
      </div>
      <div>test</div>
    </div>
  );
};

export default Notes;
