import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTicket, closeTicket } from '../features/tickets/ticketSlice'
import {
  getNotes,
  reset as notesReset,
  createNotes,
} from '../features/notes/noteSlice'
import { FaPlus } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import NoteItem from '../components/NoteItem'
import { toast } from 'react-toastify'
import Modal from 'react-modal'

const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
  },
}

Modal.setAppElement('#root')

function Ticket() {
  const [modealIsOpen, setModealIsOpen] = useState(false)
  const [noteText, setNoteText] = useState('')

  const { ticket, isLoading, isError, message } = useSelector(
    (state) => state.ticket
  )
  const { notes, isLoading: notesIsLoding } = useSelector(
    (state) => state.notes
  )

  const { ticketId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(getTicket(ticketId))
    dispatch(getNotes(ticketId))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, message, ticketId])

  // close ticket
  const onTicketClose = () => {
    dispatch(closeTicket(ticketId))
    toast.success('Ticket Closed')
    navigate('/tickets')
  }

  // open/close model

  const openModal = () => {
    setModealIsOpen(true)
  }
  const closeModal = () => {
    setModealIsOpen(false)
  }

  // Create Note Submit
  const onNoteSubmit = (e) => {
    e.preventDefault()

    dispatch(createNotes({ noteText, ticketId }))

    closeModal()
  }

  if (isLoading || notesIsLoding) {
    return <Spinner />
  }

  if (isError) {
    return <h3>Something Went Wrong</h3>
  }

  return (
    <div className='ticket-page'>
      <header className='ticket-header'>
        <BackButton url='/tickets' />
        <h2>
          Ticket Id: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>
          Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-GB')}
        </h3>

        <h3>Product: {ticket.product}</h3>

        <hr />
        <div className='ticket-desc'>
          <h3>Description of the Issue</h3>
          <p>{ticket.description}</p>
        </div>

        <h2>Notes</h2>
      </header>

      {ticket.status !== 'closed' && (
        <button onClick={openModal} className='btn'>
          <FaPlus /> Add Note
        </button>
      )}

      <Modal
        isOpen={modealIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Add Note'
      >
        <h2>Add Note</h2>
        <button className='btn-close' onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className='form-group'>
            <textarea
              name='noteText'
              id='noteText'
              className='form-control'
              placeholder='Note Text'
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className='form-group'>
            <button className='btn' type='submit'>
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}

      {ticket.status !== 'closed' && (
        <button className='btn btn-block btn-danger' onClick={onTicketClose}>
          Close Ticket
        </button>
      )}
    </div>
  )
}

export default Ticket
