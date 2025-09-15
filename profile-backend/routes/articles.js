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

// CREATE article
router.post('/', async (req, res) => {
  try {
    const newArticle = new Article(req.body);
    await newArticle.save();
    logSuccess(`New article created: ${newArticle.title}`);
    res.status(201).json(newArticle);
  } catch (err) {
    logError('Failed to create article:', err.message);
    res.status(400).json({ error: err.message });
  }
});

// UPDATE article
router.put('/:id', async (req, res) => {
  try {
    const updated = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      logWarn(`Article not found for update: id=${req.params.id}`);
      return res.status(404).json({ error: 'Article not found' });
    }
    logSuccess(`Article updated: ${updated.title}`);
    res.json(updated);
  } catch (err) {
    logError('Failed to update article:', err.message);
    res.status(400).json({ error: err.message });
  }
});

// DELETE article
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Article.findByIdAndDelete(req.params.id);
    if (!deleted) {
      logWarn(`Article not found for delete: id=${req.params.id}`);
      return res.status(404).json({ error: 'Article not found' });
    }
    logSuccess(`Article deleted: ${deleted.title}`);
    res.json({ message: 'Article deleted successfully' });
  } catch (err) {
    logError('Failed to delete article:', err.message);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
