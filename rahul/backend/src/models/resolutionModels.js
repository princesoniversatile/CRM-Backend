const pool = require('../config/db');

const createResolutionTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS resolutions (
      id SERIAL PRIMARY KEY,
      complaint_name VARCHAR(100),
      resolution_date DATE,
      resolved_by VARCHAR(100),
      resolution_description TEXT,
      resolution_status VARCHAR(20) NOT NULL
    );
  `;
  await pool.query(query);
};

const getAllResolutions = async () => {
  const result = await pool.query('SELECT * FROM resolutions');
  return result.rows;
};

const getResolutionById = async (id) => {
  const result = await pool.query('SELECT * FROM resolutions WHERE id = $1', [id]);
  return result.rows[0];
};

const createResolution = async (resolution) => {
  const { complaint_name, resolution_date, resolved_by, resolution_description, resolution_status } = resolution;
  const result = await pool.query(
    'INSERT INTO resolutions (complaint_name, resolution_date, resolved_by, resolution_description, resolution_status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [complaint_name, resolution_date, resolved_by, resolution_description, resolution_status]
  );
  return result.rows[0];
};

const updateResolution = async (id, resolution) => {
  const { complaint_name, resolution_date, resolved_by, resolution_description, resolution_status } = resolution;
  const result = await pool.query(
    'UPDATE resolutions SET complaint_name = $1, resolution_date = $2, resolved_by = $3, resolution_description = $4, resolution_status = $5 WHERE id = $6 RETURNING *',
    [complaint_name, resolution_date, resolved_by, resolution_description, resolution_status, id]
  );
  return result.rows[0];
};

const deleteResolutionById = async (id) => {
  try {
    await pool.query('DELETE FROM resolutions WHERE id = $1', [id]);
  } catch (error) {
    console.error('Error deleting resolution:', error);
    throw error;
  }
};

module.exports = {
  createResolutionTable,
  getAllResolutions,
  getResolutionById,
  createResolution,
  updateResolution,
  deleteResolutionById,
};