import React from 'react';

const Note = ({ note, toggleImportance, delNote, makeUrgent }) => {
  const label = note.important ? 'make not important' : 'make important';

  return (
    <li className="note">
      <span className={note.urgent ? 'urgent' : ''}>{note.content}</span>
      <button
        onClick={toggleImportance}
        className="m-1 btn-outline-dark btn-sm"
      >
        {label}
      </button>
      <button onClick={delNote} className="m-1 btn-outline-dark btn-sm">
        Delete
      </button>
      <button onClick={makeUrgent} className="m-1 btn-outline-dark btn-sm">
        {note.urgent ? 'make not urgent' : 'urgent'}
      </button>
    </li>
  );
};

export default Note;
