const express = require('express');
const router = express.Router();
const complaintModel = require('../models/complaintsModels');

//ye routes hai isme hi code likha hua hai ha kuch data  save hi nhi ho rha tha specify ke liuy
//konsa data wait
//ye code chal nnhi rh ahi kya

router.get('/complaints', async (req, res) => {
  try {
    const complaints = await complaintModel.getAllComplaints();
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/complaints/:id', async (req, res) => {
  try {
    const complaint = await complaintModel.getComplaintById(req.params.id);
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/complaints', async (req, res) => {
  try {
    const newComplaint = await complaintModel.createComplaint(req.body);
    res.status(201).json(newComplaint);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/complaints/:id', async (req, res) => {
  try {
    const updatedComplaint = await complaintModel.updateComplaint(req.params.id, req.body);
    res.json(updatedComplaint);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/complaints/:id', async (req, res) => {
  try {
    await complaintModel.deleteComplaint(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
