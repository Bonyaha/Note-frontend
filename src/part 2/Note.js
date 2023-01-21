import React from 'react';

const Note = ({
  note,
  toggleImportance,
  delNote,
  noteEditing,
  setEditingText,
  setNoteEditing,
  submitEdits,
}) => {
  const label = note.important ? 'make not important' : 'make important';

  return (
    <li className="note">
      {note.id === noteEditing ? (
        <input
          type="text"
          onChange={(e) => {
            setEditingText(e.target.value);
          }}
        />
      ) : (
        <span className={note.important ? 'important' : ''}>
          {note.content}
        </span>
      )}

      {note.id === noteEditing ? (
        <button
          onClick={() => submitEdits(note.id)}
          className="m-1 btn-outline-dark btn-sm"
        >
          Submit edit
        </button>
      ) : (
        <button
          onClick={() => setNoteEditing(note.id)}
          className="m-1 btn-outline-dark btn-sm"
        >
          🖋
        </button>
      )}

      <button
        onClick={toggleImportance}
        className="m-1 btn-outline-dark btn-sm"
      >
        {label}
      </button>
      <button onClick={delNote} className="m-1 btn-outline-dark btn-sm">
        Delete
      </button>
    </li>
  );
};

export default Note;
