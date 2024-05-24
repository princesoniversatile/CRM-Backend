// Customer.js

const pool = require('../config/db')

const createCustomerTable = async () => {
  const query = `
      CREATE TABLE IF NOT EXISTS customers (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email_address VARCHAR(255) NOT NULL,
        phone_number VARCHAR(20) NOT NULL,
        dob DATE NOT NULL,
        country VARCHAR(100) DEFAULT 'India',
        state VARCHAR(100) NOT NULL,
        city VARCHAR(100) NOT NULL,
        address TEXT NOT NULL,
        zip_code VARCHAR(20) NOT NULL,
        company VARCHAR(255) DEFAULT ''
      );
    `
  try {
    await pool.query(query)
    // console.log('Customer table created successfully')
  } catch (err) {
    console.error('Error creating customer table:', err.message)
  }
}

const createCustomer = async customer => {
  const {
    fullName,
    emailAddress,
    phoneNumber,
    dob,
    country,
    state,
    city,
    address,
    zipCode,
    company
  } = customer
  const query = `
    INSERT INTO customers (full_name, email_address, phone_number, dob, country, state, city, address, zip_code, company)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *
  `
  const values = [
    fullName,
    emailAddress,
    phoneNumber,
    dob,
    country,
    state,
    city,
    address,
    zipCode,
    company
  ]
  const result = await pool.query(query, values)
  return result.rows[0]
}

const getAllCustomers = async () => {
  const query = 'SELECT * FROM customers'
  const result = await pool.query(query)
  return result.rows
}

const getCustomerById = async id => {
  const query = 'SELECT * FROM customers WHERE id = $1'
  const result = await pool.query(query, [id])
  return result.rows[0]
}

const updateCustomer = async (id, customer) => {
  const {
    fullName,
    emailAddress,
    phoneNumber,
    dob,
    country,
    state,
    city,
    address,
    zipCode,
    company
  } = customer
  const query = `
    UPDATE customers
    SET full_name = $1, email_address = $2, phone_number = $3, dob = $4, country = $5, state = $6, city = $7, address = $8, zip_code = $9, company = $10
    WHERE id = $11
    RETURNING *
  `
  const values = [
    fullName,
    emailAddress,
    phoneNumber,
    dob,
    country,
    state,
    city,
    address,
    zipCode,
    company,
    id
  ]
  const result = await pool.query(query, values)
  return result.rows[0]
}

const deleteCustomer = async id => {
  const query = 'DELETE FROM customers WHERE id = $1'
  await pool.query(query, [id])
}

module.exports = {
  createCustomerTable,
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer
}
