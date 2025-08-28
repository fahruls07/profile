require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const experiencesRoutes = require('./routes/experiences');
const educationRoutes = require('./routes/education');
const articlesRoutes = require('./routes/articles');

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/experiences', experiencesRoutes);
app.use('/education', educationRoutes);
app.use('/articles', articlesRoutes);

const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/cmsdb';

mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> {
    console.log('MongoDB connected');
    app.listen(PORT, ()=> console.log(`CMS backend listening on ${PORT}`));
  })
  .catch(err => {
    console.error('Mongo connect error', err);
  });
