import React, { useState } from "react";

function Notes() {
  const [notes, setNotes] = useState([
    { id: 1, title: "Math Formulas", content: "Area of circle = πr²" },
    { id: 2, title: "Physics Laws", content: "Newton's First Law of Motion" },
  ]);
  const [newNote, setNewNote] = useState({ title: "", content: "" });

  const handleAddNote = () => {
    if (newNote.title && newNote.content) {
      setNotes([...notes, { ...newNote, id: notes.length + 1 }]);
      setNewNote({ title: "", content: "" });
    }
  };

  return (
    <div className="notes-container">
      <h2>My Notes</h2>

      <div className="note-form">
        <input
          type="text"
          placeholder="Note title"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
        />
        <textarea
          placeholder="Note content"
          value={newNote.content}
          onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
        />
        <button onClick={handleAddNote}>Add Note</button>
      </div>

      <div className="notes-list">
        {notes.map((note) => (
          <div key={note.id} className="note-card">
            <h3>{note.title}</h3>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notes;
