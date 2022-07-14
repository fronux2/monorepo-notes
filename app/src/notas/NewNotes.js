import { useState, useEffect } from 'react'
import Notes from './Notes'
import NoteForm from '../components/NoteForm'
import { allNotes, createNote, setToken } from '../services/notes'
import loginService from '../services/login'
import Notification from '../components/Notification'
import LoginForm from '../components/LoginForm'
export default function NewNotes ()  {
    const [notes, setNotes] = useState([])
   
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    useEffect(() => {
        console.log('useEffect')
        allNotes().then(notes => setNotes(notes))
    },[])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
        if(loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            setToken(user.token)
        }
    }, [])

    const handleLogout = () => {
        setUser(null)
        setToken(user.token)
        window.localStorage.removeItem('loggedNoteAppUser')
    }

    

    const addNote = (noteObject) => {   
        
        const {token} = user
        console.log(token)
        createNote(noteObject, {token}).then(response => setNotes(prevNotes => [...prevNotes, response]))
        
    }

    const handleClick = () => {
        setShowAll(!showAll)
    }   

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            
            const user = await loginService.login({
                username,
                password
            })   

            window.localStorage.setItem(
                'loggedNoteAppUser', JSON.stringify(user)
            )
            console.log(user)
            setUser(user)            
            setUsername('')
            setPassword('')
        } catch (error) {
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }             
    }

    
   
    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage}/>    
            {user !== null && <NoteForm
                addNote={addNote}              
                handleLogout={handleLogout}
            />}       
            {user === null && <LoginForm
                username={username}
                password={password}
                handleUsernameChange={({target}) => setUsername(target.value)}
                handlePasswordChange={({target}) => setPassword(target.value)}
                handleSubmit={handleLogin}
            />}
            
            <button onClick={handleClick}>{showAll ? 'Show All Notes' : 'Show Note Important'}</button>
            {
                notes
                    .filter(note => { if(showAll === true) return true
                        return note.important === true})
                    .map(note => (
                        <Notes key={note.id} id={note.id} content={note.content}></Notes>
                    ))
            }            
        </div>
    )
}