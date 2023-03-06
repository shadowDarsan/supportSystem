const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

// @description Get user tickets
// @route Get api/tickets
// @access Private
const getTickets = asyncHandler(async (req, res) => {
  // get user using the id  in the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const tickets = await Ticket.find({ user: req.user.id })
  res.json(tickets)
})

// @description Get user ticket
// @route Get api/tickets
// @access Private
const getTicket = asyncHandler(async (req, res) => {
  // get user using the id  in the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.findById(req.params.id)
  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not authorized')
  }
  res.json(ticket)
})

// @description create user tickets
// @route Post api/tickets
// @access Private
const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body

  if (!product || !description) {
    res.status(400)
    throw new Error('Please add a product and description')
  }
  // get user using the id  in the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: 'new',
  })

  res.json(ticket)
})

module.exports = { getTickets, createTicket, getTicket }