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
    <li>
      <div className="d-flex ">
        <div className="flex-grow-1">
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
        </div>
        <div className="">
          {note.id === noteEditing ? (
            <button
              onClick={() => submitEdits(note.id)}
              className="m-1 btn-outline-dark btn-sm "
            >
              Submit edit
            </button>
          ) : (
            <button
              onClick={() => setNoteEditing(note.id)}
              className="m-1 btn-outline-dark btn-sm "
            >
              🖋
            </button>
          )}
          <button
            onClick={toggleImportance}
            className="btn-outline-dark btn-sm me-2"
          >
            {label}
          </button>
          <button onClick={delNote} className=" btn-outline-dark btn-sm me-5 ">
            Delete
          </button>
        </div>
      </div>
    </li>
  );
};

export default Note;
