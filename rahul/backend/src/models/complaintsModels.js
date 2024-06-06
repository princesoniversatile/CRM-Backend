const pool = require('../config/db');

// Create complaints table
const createComplaintsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS complaints (
      id SERIAL PRIMARY KEY,
      customer_name VARCHAR(100) NOT NULL,
      complaint_date DATE NOT NULL,
      complaint_type VARCHAR(20) NOT NULL,
      title VARCHAR(100) NOT NULL,
      description TEXT,
      status VARCHAR(20) NOT NULL
    );
  `;
  await pool.query(query);
};

// Get all complaints
const getAllComplaints = async () => {
  const result = await pool.query('SELECT * FROM complaints');
  return result.rows;
};

// Get complaint by ID
const getComplaintById = async (id) => {
  const result = await pool.query('SELECT * FROM complaints WHERE id = $1', [id]);
  return result.rows[0];
};

// Create new complaint
const createComplaint = async (complaint) => {
  const { customer_name, complaint_date, complaint_type, title, description, status } = complaint;
  const result = await pool.query(
    'INSERT INTO complaints (customer_name, complaint_date, complaint_type, title, description, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [customer_name, complaint_date, complaint_type, title, description, status]
  );
  return result.rows[0];
};

// Update complaint
const updateComplaint = async (id, complaint) => {
  const { customer_name, complaint_date, complaint_type, title, description, status } = complaint;
  const result = await pool.query(
    'UPDATE complaints SET customer_name = $1, complaint_date = $2, complaint_type = $3, title = $4, description = $5, status = $6 WHERE id = $7 RETURNING *',
    [customer_name, complaint_date, complaint_type, title, description, status, id]
  );
  return result.rows[0];
};

// Delete complaint by ID
const deleteComplaintById = async (id) => {
  try {
    const result = await pool.query('DELETE FROM complaints WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      throw new Error(`Complaint with id ${id} not found`);
    }
  } catch (error) {
    console.error('Error deleting complaint:', error);
    throw error;
  }
};

module.exports = {
  createComplaintsTable,
  getAllComplaints,
  getComplaintById,
  createComplaint,
  updateComplaint,
  deleteComplaintById,
};
