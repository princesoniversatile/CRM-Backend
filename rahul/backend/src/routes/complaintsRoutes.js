const express = require('express');
const router = express.Router();
const complaintsController = require('../controllers/complaintsController');

// Get all complaints
router.get('/complaints', complaintsController.getAllComplaints);

// Get complaint by ID
router.get('/complaints/:id', complaintsController.getComplaintById);

// Create a new complaint
router.post('/complaints', complaintsController.createComplaint);

// Update an existing complaint
router.put('/complaints/:id', complaintsController.updateComplaint);

// Delete a complaint
router.delete('/complaints/:id', complaintsController.deleteComplaint);

module.exports = router;
