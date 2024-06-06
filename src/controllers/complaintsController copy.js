const complaintModel = require('../models/complaintsModels')

const getAllComplaints = async (req, res) => {
  try {
    const complaints = await complaintModel.getAllComplaints()
    res.status(200).json(complaints)
  } catch (err) {
    console.error('Error fetching complaints:', err)
    res.status(500).json({ error: 'Failed to retrieve complaints' })
  }
}

const getComplaintById = async (req, res) => {
  try {
    const { id } = req.params
    const complaint = await complaintModel.getComplaintById(id)
    if (complaint) {
      res.status(200).json(complaint)
    } else {
      res.status(404).json({ error: 'Complaint not found' })
    }
  } catch (error) {
    console.error('Error fetching complaint:', error)
    res.status(500).json({ error: 'Failed to retrieve complaint' })
  }
}

const createComplaint = async (req, res) => {
  try {
    const {
      customer_name,
      complaint_date,
      complaint_type,
      title,
      description,
      status
    } = req.body

    const validComplaintTypes = ['claim', 'warranty', 'repair']
    if (!validComplaintTypes.includes(complaint_type.toLowerCase())) {
      return res.status(400).json({ error: 'Invalid complaint type' })
    }

    const newComplaint = await complaintModel.createComplaint({
      customer_name,
      complaint_date,
      complaint_type,
      title,
      description,
      status
    })
    res.status(201).json(newComplaint)
  } catch (error) {
    console.error('Error creating complaint:', error)
    res.status(500).json({ error: 'Failed to create complaint' })
  }
}

const updateComplaint = async (req, res) => {
  try {
    const { id } = req.params
    const {
      customer_name,
      complaint_date,
      complaint_type,
      title,
      description,
      status
    } = req.body

    const validComplaintTypes = ['claim', 'warranty', 'repair']
    if (!validComplaintTypes.includes(complaint_type.toLowerCase())) {
      return res.status(400).json({ error: 'Invalid complaint type' })
    }

    //yahi bata de na chik chik krega nhi to wo

    const updatedComplaint = await complaintModel.updateComplaint(id, {
      customer_name,
      complaint_date,
      complaint_type,
      title,
      description,
      status
    })

    if (updatedComplaint) {
      res.status(200).json(updatedComplaint)
    } else {
      res.status(404).json({ error: 'Complaint not found' })
    }
  } catch (error) {
    console.error('Error updating complaint:', error)
    res.status(500).json({ error: 'Failed to update complaint' })
  }
}

const deleteComplaint = async (req, res) => {
  try {
    const { id } = req.params
    await complaintModel.deleteComplaint(id)
    res.status(204).json()
  } catch (error) {
    console.error('Error deleting complaint:', error)
    res.status(500).json({ error: 'Failed to delete complaint' })
  }
}

module.exports = {
  getAllComplaints,
  getComplaintById,
  createComplaint,
  updateComplaint,
  deleteComplaint
}
