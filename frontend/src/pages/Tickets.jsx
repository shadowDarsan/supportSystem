import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTickets, reset } from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import TicketItem from '../components/TicketItem'
import { toast } from 'react-toastify'

function Tickets() {
  const { tickets, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.ticket
  )
  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset())
      }
    }
  }, [dispatch, isSuccess])

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    dispatch(getTickets())
  }, [dispatch, isError, message])

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h3>Something went Wrong please try again</h3>
  }
  return (
    <>
      <BackButton url={'/'} />
      <h1>Tickets</h1>
      <div className='tickets'>
        <div className='ticket-headings'>
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>
        {tickets.map((ticket) => (
          <TicketItem key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </>
  )
}

export default Tickets
