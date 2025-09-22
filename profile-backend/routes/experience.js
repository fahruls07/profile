const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience');
const { logInfo, logWarn, logError, logSuccess } = require('../utils/logger');

// ✅ GET all experiences
router.get('/', async (req, res) => {
  try {
    const data = await Experience.find().sort({ startDate: -1 });
    logSuccess(`Experience fetched: ${data.length} items`);
    res.json(data);
  } catch (err) {
    logError('Failed to fetch experiences:', err.message);
    res.status(500).json({ error: 'Failed to fetch experiences' });
  }
});

// ✅ GET experience by slug (buat FE detail page)
router.get('/:slug', async (req, res) => {
  try {
    const exp = await Experience.findOne({ slug: req.params.slug });
    if (!exp) {
      logWarn(`Experience not found for slug: ${req.params.slug}`);
      return res.status(404).json({ error: 'Experience not found' });
    }
    logSuccess(`Experience fetched: ${exp.role} @ ${exp.company}`);
    res.json(exp);
  } catch (err) {
    logError('Failed to fetch experience by slug:', err.message);
    res.status(500).json({ error: 'Failed to fetch experience' });
  }
});

// CREATE new experience (single or bulk)
router.post('/', async (req, res) => {
  try {
    let result;

    if (Array.isArray(req.body)) {
      // bulk insert
      result = await Experience.insertMany(req.body);
      logSuccess(`Bulk experience created: ${result.length} items`);
    } else {
      // single insert
      const newExp = new Experience(req.body);
      result = await newExp.save();
      logSuccess(`New experience created: ${newExp.role} @ ${newExp.company}`);
    }

    res.status(201).json(result);
  } catch (err) {
    logError('Failed to create experience:', err.message);
    res.status(400).json({ error: err.message });
  }
});

// ✅ UPDATE experience by id
router.put('/:id', async (req, res) => {
  try {
    const updated = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
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

module.exports = router;
