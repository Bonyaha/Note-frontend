import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note'

test('renders content', () => {
  const note = {
    content: 'Does not work anymore :(',
    important: true,
  }
  const toggleImportance = jest.fn()
  const delNote = jest.fn()
  const noteEditing = null
  const setEditingText = jest.fn()
  const setNoteEditing = jest.fn()
  const submitEdits = jest.fn()
  const handleCheck = jest.fn()

  render(
    <Note
      note={note}
      toggleImportance={toggleImportance}
      delNote={delNote}
      noteEditing={noteEditing}
      setEditingText={setEditingText}
      setNoteEditing={setNoteEditing}
      submitEdits={submitEdits}
      handleCheck={handleCheck}
    />
  )
  //console.log(container)
  /* const div = container.querySelector('.important.bg-light.p-1.rounded-1')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  ) */
  const element = screen.getByText('Does not work anymore :(', { exact: false })
  screen.debug(element)
  expect(element).toBeDefined()
})

test('clicking the button calls event handler once', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
  }
  const delNote = jest.fn()
  const noteEditing = null
  const setEditingText = jest.fn()
  const setNoteEditing = jest.fn()
  const submitEdits = jest.fn()
  const handleCheck = jest.fn()
  const mockHandler = jest.fn()

  render(
    <Note
      note={note}
      toggleImportance={mockHandler}
      delNote={delNote}
      noteEditing={noteEditing}
      setEditingText={setEditingText}
      setNoteEditing={setNoteEditing}
      submitEdits={submitEdits}
      handleCheck={handleCheck}
    />
  )

  const user = userEvent.setup()
  const button = screen.getByText('make not important')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})
