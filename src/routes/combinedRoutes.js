const express = require('express');
const router = express.Router();
const { getLeadsWithHistory } = require('../controllers/getLeadsWithHistory');

router.get('/leads-with-history', getLeadsWithHistory);

module.exports = router;
