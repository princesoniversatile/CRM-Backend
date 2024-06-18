// Import necessary modules
const pool = require('../config/db');

// Function to create lead history table
const createLeadHistoryTable = async () => {
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS lead_history (
                id SERIAL PRIMARY KEY,
                lead_name TEXT,
                followup_date DATE,
                followup_remarks TEXT
            )
        `;
        await pool.query(query);
        console.log('Lead history table created successfully.');
    } catch (err) {
        console.error('Error creating lead history table:', err);
    }
};

// Function to fetch all lead history
const getAllLeadHistory = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM lead_history ORDER BY id DESC');
        const leadHistory = result.rows;
        res.status(200).json(leadHistory);
    } catch (err) {
        console.error('Error fetching lead history:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Function to create a new lead history entry
const createLeadHistory = async (req, res) => {
    const { lead_name, followup_date, followup_remarks } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO lead_history (lead_name, followup_date, followup_remarks) VALUES ($1, $2, $3) RETURNING *',
            [lead_name, followup_date, followup_remarks]
        );
        const newLeadHistoryEntry = result.rows[0];
        res.status(201).json(newLeadHistoryEntry);
    } catch (err) {
        console.error('Error creating lead history entry:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Function to update a lead history entry
const updateLeadHistory = async (req, res) => {
    const leadId = req.params.id;
    const { lead_name, followup_date, followup_remarks } = req.body;
    try {
        const result = await pool.query(
            'UPDATE lead_history SET lead_name = $1, followup_date = $2, followup_remarks = $3 WHERE id = $4 RETURNING *',
            [lead_name, followup_date, followup_remarks, leadId]
        );
        const updatedLeadHistoryEntry = result.rows[0];
        res.status(200).json(updatedLeadHistoryEntry);
    } catch (err) {
        console.error(`Error updating lead history entry with ID ${leadId}:`, err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Function to delete a lead history entry
const deleteLeadHistory = async (req, res) => {
    const leadId = req.params.id;
    try {
        await pool.query('DELETE FROM lead_history WHERE id = $1', [leadId]);
        res.status(200).json({ message: `Lead history entry with ID ${leadId} deleted successfully.` });
    } catch (err) {
        console.error(`Error deleting lead history entry with ID ${leadId}:`, err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createLeadHistoryTable,
    getAllLeadHistory,
    createLeadHistory,
    updateLeadHistory,
    deleteLeadHistory,
};
