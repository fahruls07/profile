const express = require('express');
const Article = require('../models/Articles');

const router = express.Router();

// GET semua artikel
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find().sort({ date: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching articles', error: err });
  }
});

// GET detail artikel by slug
router.get('/:slug', async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    if (!article) return res.status(404).json({ message: 'Article not found' });
    res.json(article);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching article', error: err });
  }
});

module.exports = router;
