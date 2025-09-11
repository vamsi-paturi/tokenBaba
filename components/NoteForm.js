// components/NoteForm.js

import React, { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { db } from "../lib/firebase";

const NoteForm = ({ onNoteAdded }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !body) return;

    try {
      const docRef = await addDoc(collection(db, "notes"), {
        title,
        body,
        createdAt: serverTimestamp(),
      });
      onNoteAdded({ id: docRef.id, title, body });
      setTitle("");
      setBody("");
    } catch (error) {
      console.error("Error adding note: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <input
        type="text"
        placeholder="Title"
        className="border p-2 rounded w-full mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Body"
        className="border p-2 rounded w-full mb-2"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add Note
      </button>
    </form>
  );
};

export default NoteForm;
