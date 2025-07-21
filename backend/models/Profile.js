const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: String,
  title: String,
  bio: String,
  skills: [String],
  experiences: [
    {
      position: String,
      company: String,
      duration: String,
      description: String,
      techStack: [String],
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
