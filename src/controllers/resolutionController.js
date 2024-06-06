const resolutionModel = require('../models/resolutionModels');

const getAllResolutions = async (req, res) => {
  try {
    const resolutions = await resolutionModel.getAllResolutions();
    console.log('Resolutions fetched:', resolutions); // Debugging
    res.status(200).json(resolutions);
  } catch (err) {
    console.error('Error fetching resolutions:', err);
    res.status(500).json({ error: 'Failed to retrieve resolutions' });
  }
};

const getResolutionById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Fetching resolution with ID:', id); // Debugging
    if (!id) {
      return res.status(400).json({ error: 'Resolution ID is required' });
    }
    const resolution = await resolutionModel.getResolutionById(id);
    if (resolution) {
      res.status(200).json(resolution);
    } else {
      res.status(404).json({ error: 'Resolution not found' });
    }
  } catch (error) {
    console.error('Error fetching resolution:', error);
    res.status(500).json({ error: 'Failed to retrieve resolution' });
  }
};

const createResolution = async (req, res) => {
  try {
    const { complaint_name, resolution_description, resolved_by, resolution_date, resolution_status } = req.body;
    console.log('Creating resolution:', req.body); // Debugging

    const newResolution = await resolutionModel.createResolution({
      complaint_name,
      resolution_description,
      resolved_by,
      resolution_date,
      resolution_status
    });
    res.status(201).json(newResolution);
  } catch (error) {
    console.error('Error creating resolution:', error);
    res.status(500).json({ error: 'Failed to create resolution' });
  }
};

const updateResolution = async (req, res) => {
  try {
    const { id } = req.params;
    const { complaint_name, resolution_description, resolved_by, resolution_date, resolution_status } = req.body;
    console.log('Updating resolution with ID:', id, 'Data:', req.body); // Debugging

    const updatedResolution = await resolutionModel.updateResolution(id, {
      complaint_name,
      resolution_description,
      resolved_by,
      resolution_date,
      resolution_status
    });

    if (updatedResolution) {
      res.status(200).json(updatedResolution);
    } else {
      res.status(404).json({ error: 'Resolution not found' });
    }
  } catch (error) {
    console.error('Error updating resolution:', error);
    res.status(500).json({ error: 'Failed to update resolution' });
  }
};

const deleteResolution = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Deleting resolution with ID:', id); // Debugging
    await resolutionModel.deleteResolution(id);
    res.status(204).json();
  } catch (error) {
    console.error('Error deleting resolution:', error);
    res.status(500).json({ error: 'Failed to delete resolution' });
  }
};

module.exports = {
  getAllResolutions,
  getResolutionById,
  createResolution,
  updateResolution,
  deleteResolution
};
