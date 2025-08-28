const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: String,
  slug: { type: String, unique: true },
  content: String,
  tags: [String],
  published: { type: Boolean, default: false },
  publishedAt: Date
}, { timestamps: true });

module.exports = mongoose.model('Article', ArticleSchema);
