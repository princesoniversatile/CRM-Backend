const express = require('express')
const router = express.Router()
const {
  getAllFollowupHistory,
  createFollowupHistory,
  updateFollowupHistory,
  deleteFollowupHistory
} = require('../controllers/FollowUpHistoryController')

// Route to get all followup history
router.get('/followup-history', getAllFollowupHistory)

// Route to create a new followup history entry
router.post('/followup-history', createFollowupHistory)

// Route to update an existing followup history entry
router.put('/followup-history/:id', updateFollowupHistory)

// Route to delete a followup history entry
router.delete('/followup-history/:id', deleteFollowupHistory)

module.exports = router
