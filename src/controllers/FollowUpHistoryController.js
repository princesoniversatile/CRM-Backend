// Import necessary modules
const pool = require('../config/db');

// Function to create followup_history table
const createFollowupHistoryTable = async () => {
  try {
    const query = `
      CREATE TABLE IF NOT EXISTS followup_history (
        id SERIAL PRIMARY KEY,
        lead_id INT REFERENCES leads(id) ON DELETE CASCADE,
        date DATE NOT NULL,
        next_followup_date DATE,
        remarks TEXT
      )
    `;
    await pool.query(query);
    console.log('Followup history table created successfully.');
  } catch (err) {
    console.error('Error creating followup history table:', err);
  }
};

// Function to fetch all followup history
const getAllFollowupHistory = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM followup_history ORDER BY id DESC'
    );
    const followupHistory = result.rows;
    res.status(200).json(followupHistory);
  } catch (err) {
    console.error('Error fetching followup history:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to create a new followup history entry
const createFollowupHistory = async (req, res) => {
  const { lead_id, date, next_followup_date, remarks } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO followup_history (lead_id, date, next_followup_date, remarks) VALUES ($1, $2, $3, $4) RETURNING *',
      [lead_id, date, next_followup_date, remarks]
    );
    const newFollowupHistoryEntry = result.rows[0];
    res.status(201).json(newFollowupHistoryEntry);
  } catch (err) {
    console.error('Error creating followup history entry:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to update a followup history entry
const updateFollowupHistory = async (req, res) => {
  const followupId = req.params.id;
  const { lead_id, date, next_followup_date, remarks } = req.body;
  try {
    const result = await pool.query(
      'UPDATE followup_history SET lead_id = $1, date = $2, next_followup_date = $3, remarks = $4 WHERE id = $5 RETURNING *',
      [lead_id, date, next_followup_date, remarks, followupId]
    );
    const updatedFollowupHistoryEntry = result.rows[0];
    res.status(200).json(updatedFollowupHistoryEntry);
  } catch (err) {
    console.error(`Error updating followup history entry with ID ${followupId}:`, err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to delete a followup history entry
const deleteFollowupHistory = async (req, res) => {
  const followupId = req.params.id;
  try {
    await pool.query('DELETE FROM followup_history WHERE id = $1', [followupId]);
    res.status(200).json({
      message: `Followup history entry with ID ${followupId} deleted successfully.`
    });
  } catch (err) {
    console.error(`Error deleting followup history entry with ID ${followupId}:`, err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createFollowupHistoryTable,
  getAllFollowupHistory,
  createFollowupHistory,
  updateFollowupHistory,
  deleteFollowupHistory
};
