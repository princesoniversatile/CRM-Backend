// Import necessary modules
const express = require('express');
const router = express.Router();
const leadHistoryController = require('../controllers/leadHistoryController');

// Route to get all lead history entries
router.get('/lead-history', leadHistoryController.getAllLeadHistory);

// Route to create a new lead history entry
router.post('/lead-history', leadHistoryController.createLeadHistory);

// Route to update a lead history entry
router.put('/lead-history/:id', leadHistoryController.updateLeadHistory);

// Route to delete a lead history entry
router.delete('/lead-history/:id', leadHistoryController.deleteLeadHistory);

// Route to create lead history table
router.post('/create-lead-history-table', leadHistoryController.createLeadHistoryTable);

module.exports = router;
