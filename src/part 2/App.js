import { useState, useEffect } from 'react'
import Note from './Note'
import noteService from './services/notes'
import loginService from './services/login'
import Notification from './Notification'

const Footer = () => {
  const footerStyle = { color: 'white', fontStyle: 'italic', fontSize: 16 }
  return (
    <div style={footerStyle}>
      <br />
      <em>
        Note app, Department of Computer Science, University of Helsinki 2022
      </em>
    </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [noteEditing, setNoteEditing] = useState(null)
  const [editingText, setEditingText] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes)
    })
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: false,
      checked: false,
    }
    if (noteObject.content.length < 5) {
      alert('Please add more text')
    }
    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote))
      setNewNote('')
    })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id)
    const changedNote = { ...note, important: !note.important }
    console.log('Changed')
    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)))
      })
      .catch(() => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter((n) => n.id !== id))
      })
  }
  const delNote = (id) => {
    window.confirm('Delete this note?')
    noteService.del(id)
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes)
    })
  }

  const submitEdits = (id) => {
    const note = notes.find((n) => n.id === id)
    console.log(editingText)
    const changedNote = { ...note, content: editingText }
    noteService.update(id, changedNote).then((returnedNote) => {
      setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)))
    })
    setNoteEditing(null)
  }
  const handleCheck = (id) => {
    const note = notes.find((n) => n.id === id)
    //console.log(note)
    const changedNote = { ...note, checked: !note.checked }
    if (changedNote.changed) console.log('Changed')

    noteService.update(id, changedNote).then((returnedNote) => {
      setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)))
    })
  }
  const deleteNote = () => {
    let x = notes.filter((n) => n.checked === true)
    console.log('Pussy')
    if (x.length > 1) {
      console.log('test')
      noteService.delMany()
      noteService.getAll().then((initialNotes) => {
        setNotes(initialNotes)
      })
    }
  }
  const showDeleteMany = notes.filter((n) => n.checked === true)
  //console.log(showDeleteMany)
  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )
  const noteForm = () => (
    <form onSubmit={addNote}>
      <div className='input-group mb-1 w-50'>
        <input
          type='text'
          value={newNote}
          className='form-control'
          onChange={handleNoteChange}
          required
        />

        <button type='submit' className='ms-0 btn btn-light btn-sm'>
          save
        </button>
      </div>
    </form>
  )
  return (
    <div className='m-3 w-auto'>
      <h1>Notes app</h1>
      <Notification message={errorMessage} />

      {user === null && loginForm()}
      {user && (
        <div>
          <p>{user.name} logged in</p>

          {noteForm()}
        </div>
      )}

      <div>
        <button className='btn btn-info' onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
        {showDeleteMany.length > 1 ? (
          <button className='btn btn-info ms-2' onClick={() => delNote()}>
            Delete selected
          </button>
        ) : (
          ''
        )}
      </div>
      <div className='w-75'>
        <ol>
          {notesToShow.map((note) => (
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
              delNote={() => deleteNote(note.id)}
              noteEditing={noteEditing}
              setEditingText={setEditingText}
              setNoteEditing={setNoteEditing}
              submitEdits={submitEdits}
              handleCheck={() => handleCheck(note.id)}
            />
          ))}
        </ol>
      </div>

      <Footer />
    </div>
  )
}

export default App
