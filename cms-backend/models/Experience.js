const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
  title: String,
  company: String,
  slug: { type: String, unique: true },
  startDate: String,
  endDate: String,
  description: String,
  tech: [String],
  logo: String,
  order: Number
}, { timestamps: true });

module.exports = mongoose.model('Experience', ExperienceSchema);
