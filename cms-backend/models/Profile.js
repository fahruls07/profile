const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name: String,
  title: String,
  about: String,
  email: String,
  phone: String,
  socials: Object,
  bannerImages: [String],
  avatar: String
}, { timestamps: true });

module.exports = mongoose.model('Profile', ProfileSchema);
