import axios from 'axios'

let token = null

export const setToken = newToken => {
    token = `Bearer ${newToken}`
}

export const allNotes = () => {
    return axios.get('/api/notes')
        .then(res => {
            const {data} = res
            return data
        })
}

export const createNote = (newObject, {token}) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}` 
        }
    }
    return axios.post('/api/notes', newObject, config )    
        .then(response => {
            const {data} = response
            return data
            

        })
       
}