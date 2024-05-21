const pool = require('../config/db');

const createCategoryTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS categories (
      id SERIAL PRIMARY KEY,
      category_name VARCHAR(100) NOT NULL,
      description TEXT
    );
  `;
  await pool.query(query);
};

const getAllCategories = async () => {
  const result = await pool.query('SELECT * FROM categories');
  return result.rows;
};

const getCategoryById = async (id) => {
  const result = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
  return result.rows[0];
};

const createCategory = async (category) => {
  const { category_name, description } = category;
  const result = await pool.query(
    'INSERT INTO categories (category_name, description) VALUES ($1, $2) RETURNING *',
    [category_name, description]
  );
  return result.rows[0];
};

const updateCategory = async (id, category) => {
  const { category_name, description } = category;
  const result = await pool.query(
    'UPDATE categories SET category_name = $1, description = $2 WHERE id = $3 RETURNING *',
    [category_name, description, id]
  );
  return result.rows[0];
};

const deleteCategory = async (id) => {
  await pool.query('DELETE FROM categories WHERE id = $1', [id]);
};

module.exports = {
  createCategoryTable,
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};

