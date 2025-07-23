//const mongoose = require('mongoose');
import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  role: String,
  company: String,
  year: String,
  description: String,
  responsibilities: [String],
  stack: [String],
  slug: String, // ← tambahkan slug
});

export default mongoose.model('Experience', experienceSchema);
