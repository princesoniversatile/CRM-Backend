const express = require('express');
const {
  getAllResolutions,
  getResolutionById,
  createResolution,
  updateResolution,
  deleteResolution,
} = require('../controllers/resolutionController');

const router = express.Router();

// Get all resolutions
router.get('/resolutions', getAllResolutions);

// Get resolution by ID
router.get('/resolutions/:id', getResolutionById);

// Create new resolution
router.post('/resolutions', createResolution);

// Update resolution
router.put('/resolutions/:id', updateResolution);

// Delete resolution
router.delete('/resolutions/:id', deleteResolution);

module.exports = router;
