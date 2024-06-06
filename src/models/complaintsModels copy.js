const pool = require('../config/db');

const createComplaintTable = async () => {
  const query = `
  CREATE TABLE IF NOT EXISTS complaints (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    complaint_date DATE NOT NULL,
    complaint_type VARCHAR(20) NOT NULL ,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    status VARCHAR(20) NOT NULL 
  );
  `;
  await pool.query(query);
};

const getAllComplaints = async () => {
  try {
    const result = await pool.query('SELECT * FROM complaints');
    console.log(result.rows);
    return result.rows;
  } catch (err) {
    console.error('Error fetching complaints:', err);
    throw err;
  }
};

const getComplaintById = async (id) => {
  const result = await pool.query('SELECT * FROM complaints WHERE id = $1', [id]);
  return result.rows[0];
};

const createComplaint = async (complaint) => {
  const { customer_name, complaint_date, complaint_type, title, description, status } = complaint;
  const result = await pool.query(
    'INSERT INTO complaints (customer_name, complaint_date, complaint_type, title, description, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [customer_name, complaint_date, complaint_type, title, description, status]
  );
  return result.rows[0];
};  

const updateComplaint = async (id, complaint) => {
  const { customer_name, complaint_date, complaint_type, title, description, status } = complaint;
  const result = await pool.query(
    'UPDATE complaints SET customer_name = $1, complaint_date = $2, complaint_type = $3, title = $4, description = $5, status = $6 WHERE id = $7 RETURNING *',
    [customer_name, complaint_date, complaint_type, title, description, status, id]
  );
  return result.rows[0];
};

const deleteComplaint = async (id) => {
  await pool.query('DELETE FROM complaints WHERE id = $1', [id]);
};

module.exports = {
  createComplaintTable,
  getAllComplaints,
  getComplaintById,
  createComplaint,
  updateComplaint,
  deleteComplaint,
};
