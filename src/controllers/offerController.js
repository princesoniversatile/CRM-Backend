const pool = require('../config/db')

exports.createOfferTable = async () => {
  const query = `
  CREATE TABLE IF NOT EXISTS offers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        type VARCHAR(50) NOT NULL,
        amount NUMERIC(10, 2) NOT NULL
      );
    `
  await pool.query(query)
}
// Get all offers
exports.getOffers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM offers')
    res.status(200).json(result.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Get a single offer by ID
exports.getOfferById = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM offers WHERE id = $1', [
      req.params.id
    ])
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Offer not found' })
    }
    res.status(200).json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Create a new offer
exports.createOffer = async (req, res) => {
  const { name, description, start_date, end_date, type, amount } = req.body
  try {
    const result = await pool.query(
      'INSERT INTO offers (name, description, start_date, end_date, type, amount) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, description, start_date, end_date, type, amount]
    )
    res.status(201).json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Update an offer by ID
exports.updateOffer = async (req, res) => {
  const { name, description, start_date, end_date, type, amount } = req.body
  try {
    const result = await pool.query(
      'UPDATE offers SET name = $1, description = $2, start_date = $3, end_date = $4, type = $5, amount = $6 WHERE id = $7 RETURNING *',
      [name, description, start_date, end_date, type, amount, req.params.id]
    )
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Offer not found' })
    }
    res.status(200).json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Delete an offer by ID
exports.deleteOffer = async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM offers WHERE id = $1 RETURNING *',
      [req.params.id]
    )
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Offer not found' })
    }
    res.status(200).json({ message: 'Offer deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
