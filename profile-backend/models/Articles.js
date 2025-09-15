const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: String,
  excerpt: String,
  date: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Article', articleSchema);
