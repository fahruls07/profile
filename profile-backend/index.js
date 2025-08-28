const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const assetsPath = process.env.ASSETS_PATH || '/app/public/assets';
app.use('/assets', express.static(assetsPath));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
const profileRoute = require('./routes/profile');
const articleRoute = require('./routes/articles');
const assetsRoutes = require('./routes/assets');

app.use('/api/profile', profileRoute);
app.use('/api/articles', articleRoute);
app.use('/api/assets', assetsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
