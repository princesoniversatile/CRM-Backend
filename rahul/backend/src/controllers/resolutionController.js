const resolutionModel = require('../models/resolutionModels');

const getAllResolutions = async (req, res) => {
  try {
    const resolutions = await resolutionModel.getAllResolutions();
    res.status(200).json(resolutions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve resolutions' });
  }
};

const getResolutionById = async (req, res) => {
  try {
    const { id } = req.params;
    const resolution = await resolutionModel.getResolutionById(id);
    if (resolution) {
      res.status(200).json(resolution);
    } else {
      res.status(404).json({ error: 'Resolution not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve resolution' });
  }
};

const createResolution = async (req, res) => {
  try {
    const newResolution = await resolutionModel.createResolution(req.body);
    res.status(201).json(newResolution);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateResolution = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedResolution = await resolutionModel.updateResolution(id, req.body);
    if (updatedResolution) {
      res.status(200).json(updatedResolution);
    } else {
      res.status(404).json({ error: 'Resolution not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update resolution' });
  }
};

const deleteResolution = async (req, res) => {
  try {
    const { id } = req.params;
    await resolutionModel.deleteResolutionById(id);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete resolution' });
  }
};

module.exports = {
  getAllResolutions,
  getResolutionById,
  createResolution,
  updateResolution,
  deleteResolution,
};