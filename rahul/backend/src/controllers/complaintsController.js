const complaintsModel = require('../models/complaintsModels');

const getAllComplaints = async (req, res) => {
  try {
    const complaints = await complaintsModel.getAllComplaints();
    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve complaints' });
  }
};

const getComplaintById = async (req, res) => {
  try {
    const { id } = req.params;
    const complaint = await complaintsModel.getComplaintById(id);
    if (complaint) {
      res.status(200).json(complaint);
    } else {
      res.status(404).json({ error: 'Complaint not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve complaint' });
  }
};

const createComplaint = async (req, res) => {
  try {
    const newComplaint = await complaintsModel.createComplaint(req.body);
    res.status(201).json(newComplaint);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedComplaint = await complaintsModel.updateComplaint(id, req.body);
    if (updatedComplaint) {
      res.status(200).json(updatedComplaint);
    } else {
      res.status(404).json({ error: 'Complaint not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update complaint' });
  }
};

const deleteComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    await complaintsModel.deleteComplaintById(id);
    res.status(204).json();
  } catch (error) {
    console.error('Error deleting complaint:', error); // Add this line to log the error
    res.status(500).json({ error: 'Failed to delete complaint' });
  }
};

module.exports = {
  getAllComplaints,
  getComplaintById,
  createComplaint,
  updateComplaint,
  deleteComplaint,
};
