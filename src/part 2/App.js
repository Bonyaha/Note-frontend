import { useState, useEffect } from 'react';
import Note from './Note';
import noteService from './services/notes';
import Notification from './Notification';

const Footer = () => {
  const footerStyle = { color: 'white', fontStyle: 'italic', fontSize: 16 };
  return (
    <div style={footerStyle}>
      <br />
      <em>
        Note app, Department of Computer Science, University of Helsinki 2022
      </em>
    </div>
  );
};

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      noteId: notes.length + 1,
    };

    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote('');
    });
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };
    console.log('Changed');
    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        console.log(returnedNote);
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };
  const delNote = (id) => {
    window.confirm(`Delete this note?`);
    noteService.del(id);
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  };

  const moveUp = (id) => {
    //const note = notes.find((n) => n.id === id);
    //console.log(note.id);
    const idN = notes.findIndex((n) => n.id === id);
    console.log(idN);

    let updated = [...notes];
    updated.splice(
      idN === 0 ? updated.length - 1 : idN - 1,
      0,
      updated.splice(idN, 1)[0]
    );
    //console.log(updated);
    /* noteService.getAll().then((initialNotes) => {
      //console.log(initialNotes);
      initialNotes.splice(idN - 1, 0, initialNotes.splice(idN, 1)[0]);
      //console.log(initialNotes);
      updated = updated.concat(initialNotes);
      
    }); */

    noteService.update(id, updated).then((returnedNote) => {
      console.log('prepare');
      console.log(returnedNote);
      //setNotes(returnedNote);
    });
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <div className="m-2">
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
            delNote={() => delNote(note.id)}
            moveUp={() => moveUp(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  );
};

export default App;
