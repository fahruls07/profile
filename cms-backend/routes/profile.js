const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Profile = require('../models/Profile');

// get or create single profile doc
router.get('/', async (req, res) => {
  let p = await Profile.findOne();
  if (!p) {
    p = await Profile.create({});
  }
  res.json(p);
});

router.put('/', auth, async (req, res) => {
  let p = await Profile.findOne();
  if (!p) p = new Profile();
  Object.assign(p, req.body);
  await p.save();
  res.json(p);
});

module.exports = router;
