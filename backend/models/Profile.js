const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  position: String,
  company: String,
  duration: String,
  description: String,
  techStack: [String],
  responsibilities: [String],
  slug: String,
});

const educationSchema = new mongoose.Schema({
  school: String,
  degree: String,
  major: String,
  year: String,
  GPA: String,
});

const profileSchema = new mongoose.Schema({
  name: String,
  title: String,
  bio: String,
  location: String,
  email: String,
  skills: [String],
  languages: [String],
  experiences: [experienceSchema],
  education: [educationSchema],
  contact: {
    email: String,
    linkedin: String,
    github: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);