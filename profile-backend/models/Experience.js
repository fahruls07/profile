const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  role: String,
  company: String,
  year: String,
  description: String,
  responsibilities: [String],
  stack: [String],
  slug: { type: String, unique: true },
}, { timestamps: true });

module.exports = mongoose.model('Experience', experienceSchema);
