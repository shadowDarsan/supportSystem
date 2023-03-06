const express = require('express')
const { protect } = require('../middleware/authMiddleware')
const {
  getTickets,
  getTicket,
  createTicket,
} = require('../controller/ticketController')

const router = express.Router()

router.route('/').get(protect, getTickets).post(protect, createTicket)
router.route('/:id').get(protect, getTicket)

module.exports = router
