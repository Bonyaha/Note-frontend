import React from 'react';

const Note = ({ note, toggleImportance, delNote }) => {
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
    </li>
  );
};

export default Note;
