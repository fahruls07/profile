const express = require('express');
const Article = require('../models/Articles');
const { logInfo, logWarn, logError, logSuccess } = require('../utils/logger');

const router = express.Router();

// GET semua artikel
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find().sort({ date: -1 });
    logSuccess(`Articles fetched: ${articles.length} items`);
    res.json(articles);
  } catch (err) {
    logError('Error fetching articles:', err.message);
    res.status(500).json({ message: 'Error fetching articles', error: err.message });
  }
});

// GET detail artikel by slug
router.get('/:slug', async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    if (!article) {
      logWarn(`Article not found: slug=${req.params.slug}`);
      return res.status(404).json({ message: 'Article not found' });
    }
    logSuccess(`Article fetched: ${req.params.slug}`);
    res.json(article);
  } catch (err) {
    logError(`Error fetching article ${req.params.slug}:`, err.message);
    res.status(500).json({ message: 'Error fetching article', error: err.message });
  }
});

module.exports = router;
