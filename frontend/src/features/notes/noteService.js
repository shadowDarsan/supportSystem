import axios from 'axios'

const API_URL = '/api/tickets/'

//Get ticket notes
const getNotes = async (ticketId, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const response = await axios.get(API_URL + ticketId + '/notes', config)
  return response.data
}

//Get ticket notes
const createNotes = async (notetext, ticketId, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const response = await axios.post(
    API_URL + ticketId + '/notes',
    { text: notetext },
    config
  )
  return response.data
}

const noteService = {
  getNotes,
  createNotes,
}

export default noteService
