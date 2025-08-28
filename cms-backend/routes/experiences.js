const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Experience = require('../models/Experience');

router.get('/', async (req,res) => {
  const items = await Experience.find().sort({ order: 1, createdAt: -1 });
  res.json(items);
});

router.post('/', auth, async (req,res) => {
  const it = new Experience(req.body);
  await it.save();
  res.json(it);
});

router.put('/:id', auth, async (req,res) => {
  const it = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(it);
});

router.delete('/:id', auth, async (req,res) => {
  await Experience.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

module.exports = router;
