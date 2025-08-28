const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience');

// GET all experience
router.get('/', async (req, res) => {
  try {
    const data = await Experience.find().sort({ _id: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch experience' });
  }
});

module.exports = router;
