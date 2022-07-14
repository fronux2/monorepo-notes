import { useState, useRef} from 'react'
import Togglable from './Togglable'
export default function NoteForm({ handleLogout, addNote }) {
    const togglableRef = useRef()
    const [newNote, setNewNote] = useState('')

    const handleChange = (event) => {
        const content = event.target.value
        setNewNote(content)     
    }

    const handleSubmit = (event) => {
        const noteObject = {             
            content: newNote
        }
        addNote(noteObject)
        setNewNote('')

        togglableRef.current.toggleVisibility()
    }

    return (
        <Togglable buttonLabel="newNote">
            <h3>Create a new note</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    onChange={handleChange}
                    value={newNote}
                    placeholder='Write your note content'
                />
                <button>Guardar</button>
            </form>
            <div>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </Togglable>
    )
}