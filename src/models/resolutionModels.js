// resolutionModel.js

const pool = require('../config/db');

const createResolutionTable = async () => {
  const query = `
  CREATE TABLE IF NOT EXISTS resolutions (
    id SERIAL PRIMARY KEY,
    complaint_name VARCHAR(100) NOT NULL,
    resolution_description TEXT,
    resolved_by VARCHAR(100) NOT NULL,
    resolution_date DATE NOT NULL,
    resolution_status VARCHAR(20) NOT NULL
  );
  `;
  await pool.query(query);
};

const getAllResolutions = async () => {
  try {
    const result = await pool.query('SELECT * FROM resolutions');
    console.log(result.rows);
    return result.rows;
  } catch (err) {
    console.error('Error fetching resolutions:', err);
    throw err;
  }
};

const getResolutionById = async (id) => {
  const result = await pool.query('SELECT * FROM resolutions WHERE id = $1', [id]);
  return result.rows[0];
};

const createResolution = async (resolution) => {
  const { complaint_name, resolution_description, resolved_by, resolution_date, resolution_status } = resolution;
  const result = await pool.query(
    'INSERT INTO resolutions (complaint_name, resolution_description, resolved_by, resolution_date, resolution_status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [complaint_name, resolution_description, resolved_by, resolution_date, resolution_status]
  );
  return result.rows[0];
};  

const updateResolution = async (id, resolution) => {
  const { complaint_name, resolution_description, resolved_by, resolution_date, resolution_status } = resolution;
  const result = await pool.query(
    'UPDATE resolutions SET complaint_name = $1, resolution_description = $2, resolved_by = $3, resolution_date = $4, resolution_status = $5 WHERE id = $6 RETURNING *',
    [complaint_name, resolution_description, resolved_by, resolution_date, resolution_status, id]
  );
  return result.rows[0];
};

const deleteResolution = async (id) => {
  await pool.query('DELETE FROM resolutions WHERE id = $1', [id]);
};

module.exports = {
  createResolutionTable,
  getAllResolutions,
  getResolutionById,
  createResolution,
  updateResolution,
  deleteResolution,
};
