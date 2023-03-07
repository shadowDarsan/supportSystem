const express = require('express')

const router = express.Router({ mergeParams: true })

const { getNotes, addNote } = require('../controller/noteController.js')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getNotes).post(protect, addNote)

module.exports = router
