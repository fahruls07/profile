const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience');
const { logInfo, logWarn, logError, logSuccess } = require('../utils/logger');

// GET all experience
router.get('/', async (req, res) => {
  try {
    const data = await Experience.find().sort({ _id: -1 });
    logSuccess(`Experience fetched: ${data.length} items`);
    res.json(data);
  } catch (err) {
    logError('Failed to fetch experience:', err.message);
    res.status(500).json({ error: 'Failed to fetch experience' });
  }
});

// CREATE new experience
router.post('/', async (req, res) => {
  try {
    const newExp = new Experience(req.body);
    await newExp.save();
    logSuccess(`New experience created: ${newExp.role} @ ${newExp.company}`);
    res.status(201).json(newExp);
  } catch (err) {
    logError('Failed to create experience:', err.message);
    res.status(400).json({ error: err.message });
  }
});

// UPDATE experience by id
router.put('/:id', async (req, res) => {
  try {
    const updated = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      logWarn(`Experience not found for update: id=${req.params.id}`);
      return res.status(404).json({ error: 'Experience not found' });
    }
    logSuccess(`Experience updated: ${updated.role} @ ${updated.company}`);
    res.json(updated);
  } catch (err) {
    logError('Failed to update experience:', err.message);
    res.status(400).json({ error: err.message });
  }
});

// DELETE experience by id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Experience.findByIdAndDelete(req.params.id);
    if (!deleted) {
      logWarn(`Experience not found for delete: id=${req.params.id}`);
      return res.status(404).json({ error: 'Experience not found' });
    }
    logSuccess(`Experience deleted: ${deleted.role} @ ${deleted.company}`);
    res.json({ message: 'Experience deleted successfully' });
  } catch (err) {
    logError('Failed to delete experience:', err.message);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
