const pool = require('../config/db')
const jwt = require('jsonwebtoken')

const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' })
    }

    const user = result.rows[0]
    if (password !== user.password) {
      return res.status(400).json({ error: 'Invalid credentials' })
    }

    if (!user.status) {
      return res.status(403).json({ error: 'You are not authorized' })
    }

    const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' })
    const userDetails = {
      id:user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      phone_number: user.phone_number,
      city: user.city,
      state: user.state,
      role: user.role,
      status: user.status,
      picture: user.picture
    }

    res.status(200).json({
      message: 'Login successful',
      userDetails: userDetails,
      token: token
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  loginUser
}
