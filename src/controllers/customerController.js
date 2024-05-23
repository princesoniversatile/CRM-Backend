// customerController.js

const Customer = require('../models/customerModel');

const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.getAllCustomers();
    res.status(200).json(customers);
  } catch (error) {
    console.error('Failed to retrieve customers:', error);
    res.status(500).json({ error: 'Failed to retrieve customers' });
  }
};

const getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.getCustomerById(id);
    if (customer) {
      res.status(200).json(customer);
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (error) {
    console.error('Failed to retrieve customer:', error);
    res.status(500).json({ error: 'Failed to retrieve customer' });
  }
};

const createCustomer = async (req, res) => {
  try {
    const newCustomer = await Customer.createCustomer(req.body);
    res.status(201).json(newCustomer);
  } catch (error) {
    console.error('Failed to create customer:', error);
    res.status(500).json({ error: 'Failed to create customer' });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCustomer = await Customer.updateCustomer(id, req.body);
    if (updatedCustomer) {
      res.status(200).json(updatedCustomer);
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (error) {
    console.error('Failed to update customer:', error);
    res.status(500).json({ error: 'Failed to update customer' });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    await Customer.deleteCustomer(id);
    res.status(204).json();
  } catch (error) {
    console.error('Failed to delete customer:', error);
    res.status(500).json({ error: 'Failed to delete customer' });
  }
};

module.exports = {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
