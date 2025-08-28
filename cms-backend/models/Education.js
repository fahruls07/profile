const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema({
  institution: String,
  degree: String,
  major: String,
  startYear: String,
  endYear: String,
  gpa: String,
  order: Number
}, { timestamps: true });

module.exports = mongoose.model('Education', EducationSchema);
