const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Education = require('../models/Education');

router.get('/', async (req,res) => {
  const items = await Education.find().sort({ order: 1 });
  res.json(items);
});

router.post('/', auth, async (req,res) => {
  const it = new Education(req.body);
  await it.save();
  res.json(it);
});

router.put('/:id', auth, async (req,res) => {
  const it = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(it);
});

router.delete('/:id', auth, async (req,res) => {
  await Education.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

module.exports = router;
