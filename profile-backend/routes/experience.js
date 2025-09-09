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

module.exports = router;
