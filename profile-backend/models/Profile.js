const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  company: String,
  role: String,
  startDate: String,
  endDate: String,
  year: String,
  description: String,
  stack: [String],
  responsibilities: [String],
  slug: String,
});

const educationFormalSchema = new mongoose.Schema({
  institution: String,
  degree: String,
  major: String,
  year: String,
  gpa: String,
});

const educationNonFormalSchema = new mongoose.Schema({
  course: String,
  institution: String,
  year: String,
  description: String,
});


const contactSchema = new mongoose.Schema({
  email: String,
  linkedin: String,
  github: String,
  whatsapp: {
    label: String,
    number: String,
  },
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
  educationFormal: [educationFormalSchema],
  educationNonFormal: [educationNonFormalSchema],
  contact: contactSchema,
});

module.exports = mongoose.model('Profile', profileSchema);
