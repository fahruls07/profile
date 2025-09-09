const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const { logInfo, logWarn, logError, logSuccess } = require('../utils/logger');

router.get('/', async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      logWarn('Profile not found in DB');
      return res.status(404).json({ error: 'Profile not found' });
    }
    logSuccess('Profile fetched successfully');
    res.json(profile);
  } catch (err) {
    logError('Error fetching profile:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
