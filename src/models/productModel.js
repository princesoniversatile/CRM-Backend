const pool = require('../config/db')

const createProductTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      category VARCHAR(100) NOT NULL,
      price NUMERIC(10, 2) NOT NULL,
      in_stock BOOLEAN,
      status VARCHAR(50) NOT NULL,
      CONSTRAINT fk_category
        FOREIGN KEY (category) REFERENCES categories(category_name)
        ON UPDATE RESTRICT
        ON DELETE RESTRICT
    );
  `;

  await pool.query(query); // Corrected method name here
};

const getAllProducts = async () => {
  const query = 'SELECT * FROM products'
  const result = await pool.query(query)
  return result.rows
}

// const getProductById = async id => {
//   const query = 'SELECT * FROM products WHERE id = $1'
//   const result = await pool.query(query, [id])
//   return result.rows[0]
// }

const getProductById = async id => {
  const query = 'SELECT p.*, c.* FROM products as p left join categories as c ON p.category = c.id'
  const result = await pool.query(query, [id])
  return result.rows[0]
}

const createProduct = async product => {
  const { name, category, price, in_stock, status } = product
  const query = `
    INSERT INTO products (name, category, price, in_stock, status)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `
  const values = [name, category, price, in_stock, status]
  const result = await pool.query(query, values)
  return result.rows[0]
}

const updateProduct = async (id, product) => {
  const { name, category, price, in_stock, status } = product
  const query = `
    UPDATE products
    SET name = $1, category = $2, price = $3, in_stock = $4, status = $5
    WHERE id = $6
    RETURNING *
  `
  const values = [name, category, price, in_stock, status, id]
  const result = await pool.query(query, values)
  return result.rows[0]
}

const deleteProduct = async id => {
  const query = 'DELETE FROM products WHERE id = $1'
  await pool.query(query, [id])
}

module.exports = {
  createProductTable,
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
}
