const express = require('express');
const router = express.Router();
const resolutionController = require('../controllers/resolutionController');

router.get('/resolutions', resolutionController.getAllResolutions);
router.get('/resolutions/:id', resolutionController.getResolutionById);
router.post('/resolutions', resolutionController.createResolution);
router.put('/resolutions/:id', resolutionController.updateResolution);
router.delete('/resolutions/:id', resolutionController.deleteResolution);

module.exports = router;
