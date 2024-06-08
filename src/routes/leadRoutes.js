const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');

router.get('/create-table', leadController.createLeadsTable); // Route to create table
router.get('/leads', leadController.getLeads);
router.get('/leads/:id', leadController.getLeadById);
router.post('/leads', leadController.createLead);
router.put('/leads/:id', leadController.updateLead);
router.delete('/leads/:id', leadController.deleteLead);

module.exports = router;
