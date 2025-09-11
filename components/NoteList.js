import React, { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs, orderBy, query } from "firebase/firestore";

import NoteCard from "./NoteCard";
import { db } from "../lib/firebase";

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      setIsLoading(true);
      const q = query(collection(db, "notes"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const notesData = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      }));
      setNotes(notesData);
    } catch (error) {
      console.error("Error fetching notes: ", error);
    } finally {
      setIsLoading(false);
    }
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

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-white/40 backdrop-blur-sm border border-white/20 rounded-2xl p-6 animate-pulse">
            <div className="flex justify-between items-start mb-4">
              <div className="h-6 bg-slate-200 rounded-lg w-3/4"></div>
              <div className="h-8 w-8 bg-slate-200 rounded-lg"></div>
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-slate-200 rounded w-full"></div>
              <div className="h-4 bg-slate-200 rounded w-5/6"></div>
              <div className="h-4 bg-slate-200 rounded w-4/6"></div>
            </div>
            <div className="flex justify-between items-center pt-4 mt-4 border-t border-slate-200">
              <div className="h-4 bg-slate-200 rounded w-20"></div>
              <div className="h-4 bg-slate-200 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="mx-auto w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center mb-6">
          <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-slate-800 mb-2">No tokens yet</h3>
        <p className="text-slate-600 max-w-md mx-auto leading-relaxed">
          Start by creating your first token using the form on the left. All your tokens will appear here in real-time.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {notes.map((note, index) => (
        <div key={note.id} style={{ animationDelay: `${index * 0.1}s` }}>
          <NoteCard note={note} onDelete={handleDelete} />
        </div>
      ))}
    </div>
  );
};

export default NoteList;