const pool = require('../config/db') // Import the pool from the config file

// Function to create table if it doesn't exist
const createLeadsTable = async (req, res) => {
  const query = `
        CREATE TABLE IF NOT EXISTS leads (
            id SERIAL PRIMARY KEY,
            lead_name TEXT NOT NULL,
            lead_type TEXT,
            company_name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone_number TEXT NOT NULL,
            follow_up DATE NOT NULL,
            followup_description TEXT
        );
    `
  try {
    await pool.query(query)
    res.status(200).send('Leads table created or already exists.')
  } catch (error) {
    res.status(500).send('Error creating table: ' + error.message)
  }
}

const getLeads = async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM leads')
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(500).send('Error fetching leads: ' + error.message)
  }
}

const getLeadById = async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    const results = await pool.query('SELECT * FROM leads WHERE id = $1', [id])
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(500).send('Error fetching lead by ID: ' + error.message)
  }
}

const createLead = async (req, res) => {
  const {
    lead_name,
    lead_type,
    company_name,
    email,
    phone_number,
    follow_up,
    followup_description
  } = req.body
  try {
    const results = await pool.query(
      'INSERT INTO leads (lead_name,lead_type, company_name, email, phone_number, follow_up, followup_description) VALUES ($1, $2, $3, $4, $5, $6,$7) RETURNING *',
      [
        lead_name,
        lead_type,
        company_name,
        email,
        phone_number,
        follow_up,
        followup_description
      ]
    )
    res.status(201).json(results.rows[0])
  } catch (error) {
    res.status(500).send('Error creating lead: ' + error.message)
  }
}

const updateLead = async (req, res) => {
  const id = parseInt(req.params.id)
  const {
    lead_name,
    lead_type,
    company_name,
    email,
    phone_number,
    follow_up,
    followup_description
  } = req.body
  try {
    const results = await pool.query(
      'UPDATE leads SET lead_name = $1, company_name = $2, email = $3, phone_number = $4, follow_up = $5, followup_description = $6,lead_type=$7 WHERE id = $8 RETURNING *',
      [
        lead_name,
        company_name,
        email,
        phone_number,
        follow_up,
        followup_description,
        lead_type,
        id
      ]
    )
    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(500).send('Error updating lead: ' + error.message)
  }
}

const deleteLead = async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    const results = await pool.query(
      'DELETE FROM leads WHERE id = $1 RETURNING *',
      [id]
    )
    res.status(200).json(results.rows[0])
  } catch (error) {
    res.status(500).send('Error deleting lead: ' + error.message)
  }
}

module.exports = {
  createLeadsTable,
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead
}
