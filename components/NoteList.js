// components/NoteList.js

import React, { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs, orderBy, query } from "firebase/firestore";

import NoteCard from "./NoteCard";
import { db } from "../lib/firebase";

const NoteList = () => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const q = query(collection(db, "notes"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    const notesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setNotes(notesData);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "notes", id));
      setNotes((prev) => prev.filter(note => note.id !== id));
    } catch (error) {
      console.error("Error deleting note: ", error);
    }
  };

  return (
    <div>
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default NoteList;
