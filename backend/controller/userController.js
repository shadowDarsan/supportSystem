const asyncHandler = require('express-async-handler')

// @desc Register a new user
// @route /api/users
// access Public
const registerUser = asyncHandler(async (req, res) => {
  const { kage, email, password } = req.body

  // validation
  if (!kage || !email || !password) {
    res.status(400)
    throw new Error('Please Include all fileds')
  }
})

// @desc Login a user
// @route /api/users/login
// access Public
const loginUser = asyncHandler(async (req, res) => {
  res.send('Login Route')
})

module.exports = {
  registerUser,
  loginUser,
}
