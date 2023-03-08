import { useState, useEffect, useRef } from 'react'

import Note from './components/Note'
import noteService from './services/notes'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Togglable from './components/Togglable'
import Footer from './components/Footer'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [noteEditing, setNoteEditing] = useState(null)
  const [editingText, setEditingText] = useState('')

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

      const expirationTime = new Date(user.expirationDate).getTime()
      const currentTime = new Date().getTime()
      console.log(expirationTime)
      console.log(currentTime)
      console.log(expirationTime > currentTime)
      if (expirationTime < currentTime) {
        setUser(null)
        setErrorMessage('Your session has expired. Please log in again.')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
  }, [])

  const noteFormRef = useRef()

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)
      setSuccessMessage(`Hello ${user.name}👋`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const logOut = () => {
    window.localStorage.clear()
    setUser(null)
  }
  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    if (noteObject.content.length < 5) {
      alert('Please add more text')
    }
    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote))

      setSuccessMessage(`Added ${returnedNote.content}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    })
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

  const deleteNotes = async (id) => {
    let num = 1
    if (!id) {
      if (window.confirm('Delete these notes?')) {
        let notesToDelete = notes.filter((n) => n.checked === true)
        if (notesToDelete.length > 0) {
          num = notesToDelete.length
          const noteIds = notesToDelete.map((n) => n.id)
          await noteService.delMany(noteIds)
          const initialNotes = await noteService.getAll()
          setNotes(initialNotes)
        }
      }
    } else {
      if (window.confirm('Delete this note?')) {
        await noteService.delMany([id])
        const initialNotes = await noteService.getAll()
        setNotes(initialNotes)
      }
    }

    setSuccessMessage(`Deleted ${num} ${num > 1 ? 'notes' : 'note'}`)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
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
    const changedNote = { ...note, checked: !note.checked }
    if (changedNote.changed) console.log('Changed')

    noteService.update(id, changedNote).then((returnedNote) => {
      setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)))
    })
  }

  const showDeleteMany = notes.filter((n) => n.checked === true)
  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  return (
    <div className="m-3 w-auto">
      <h1>Notes app</h1>
      <Notification message={errorMessage} isError={true} />
      <Notification message={successMessage} />

      {user === null && (
        <Togglable buttonLabel="log in">
          <LoginForm handleLogin={handleLogin} />
        </Togglable>
      )}
      {user && (
        <div>
          <p>
            {' '}
            {user.name} logged in
            <button type="submit" onClick={logOut}>
              log out
            </button>
          </p>
          <Togglable buttonLabel="new note" ref={noteFormRef}>
            <NoteForm createNote={addNote} />
          </Togglable>
          <div>
            <button
              className="btn btn-info"
              onClick={() => setShowAll(!showAll)}
            >
              show {showAll ? 'important' : 'all'}
            </button>
            {showDeleteMany.length > 1 ? (
              <button
                className="btn btn-info ms-2"
                onClick={() => deleteNotes()}
              >
                Delete selected
              </button>
            ) : (
              ''
            )}
          </div>
          <div className="w-75">
            <ol>
              {notesToShow.map((note) => (
                <Note
                  key={note.id}
                  note={note}
                  toggleImportance={() => toggleImportanceOf(note.id)}
                  delNote={() => deleteNotes(note.id)}
                  noteEditing={noteEditing}
                  setEditingText={setEditingText}
                  setNoteEditing={setNoteEditing}
                  submitEdits={submitEdits}
                  handleCheck={() => handleCheck(note.id)}
                />
              ))}
            </ol>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default App
