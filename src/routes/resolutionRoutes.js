const express = require('express');
const router = express.Router();
const resolutionController = require('../controllers/resolutionController');

router.get('/resolutions', async (req, res) => {
  try {
    const resolutions = await resolutionController.getAllResolutions();
    res.json(resolutions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/resolutions/:id', async (req, res) => {
  try {
    const resolution = await resolutionController.getResolutionById(req.params.id);
    res.json(resolution);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/resolutions', async (req, res) => {
  try {
    const newResolution = await resolutionController.createResolution(req.body);
    res.status(201).json(newResolution);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/resolutions/:id', async (req, res) => {
  try {
    const updatedResolution = await resolutionController.updateResolution(req.params.id, req.body);
    res.json(updatedResolution);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/resolutions/:id', async (req, res) => {
  try {
    await resolutionController.deleteResolution(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
