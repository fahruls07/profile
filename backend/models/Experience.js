const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  position: String,
  company: String,
  duration: String,
  description: String,
  stack: [String],
});

module.exports = mongoose.model('Experience', experienceSchema);
