const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const { logInfo, logWarn, logError, logSuccess } = require('../utils/logger');

// GET profile
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

// UPDATE or CREATE profile
router.put('/', async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (profile) {
      Object.assign(profile, req.body);
      await profile.save();
      logSuccess('Profile updated successfully');
    } else {
      profile = new Profile(req.body);
      await profile.save();
      logSuccess('New profile created');
    }
    res.json(profile);
  } catch (err) {
    logError('Error updating/creating profile:', err.message);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
