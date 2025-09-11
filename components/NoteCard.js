// components/NoteCard.js

import React from "react";

const NoteCard = ({ note, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded p-4 mb-4">
      <h3 className="text-xl font-bold mb-2">{note.title}</h3>
      <p className="mb-2">{note.body}</p>
      <button
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        onClick={() => onDelete(note.id)}
      >
        Delete
      </button>
    </div>
  );
};

export default NoteCard;
