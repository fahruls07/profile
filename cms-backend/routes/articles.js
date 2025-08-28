const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Article = require('../models/Article');

router.get('/', async (req,res) => {
  const items = await Article.find().sort({ publishedAt: -1 });
  res.json(items);
});

router.post('/', auth, async (req,res) => {
  const it = new Article(req.body);
  await it.save();
  res.json(it);
});

router.put('/:id', auth, async (req,res) => {
  const it = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(it);
});

router.delete('/:id', auth, async (req,res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

module.exports = router;
