import React from 'react';

const Note = ({ note, toggleImportance, delNote, moveUp }) => {
  const label = note.important ? 'make not important' : 'make important';
  return (
    <li className="note">
      {note.content}

      <button
        onClick={toggleImportance}
        className="m-1 btn-outline-dark btn-sm"
      >
        {label}
      </button>
      <button onClick={delNote} className="m-1 btn-outline-dark btn-sm">
        Delete
      </button>
      <button onClick={moveUp}>Move up⬆</button>
    </li>
  );
};

export default Note;
