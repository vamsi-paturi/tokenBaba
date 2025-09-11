// pages/index.js

import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";
import React from "react";

export default function Home() {
  const [refresh, setRefresh] = React.useState(false);

  const handleNoteAdded = () => {
    setRefresh(!refresh); // trigger NoteList refresh
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">tokenBaba Notes</h1>
      <NoteForm onNoteAdded={handleNoteAdded} />
      <NoteList key={refresh} />
    </div>
  );
}
