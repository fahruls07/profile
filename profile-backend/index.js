const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const { logInfo, logWarn, logError, logSuccess } = require('./utils/logger');

const app = express();
app.use(cors());
app.use(express.json());

// Logger middleware (request + response time)
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const ms = Date.now() - start;
    logInfo(`[${req.method}] ${req.originalUrl} → ${res.statusCode} (${ms}ms)`);
  });
  next();
});

const assetsPath = process.env.ASSETS_PATH || '/app/public/assets';
logInfo(`Serving static assets from: ${assetsPath}`);
app.use('/assets', express.static(assetsPath));

// MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => logSuccess('Connected to MongoDB'))
  .catch((err) => logError('MongoDB connection error:', err.message));

// Routes
const profileRoute = require('./routes/profile');
const articleRoute = require('./routes/articles');
const assetsRoutes = require('./routes/assets');
const experienceRoutes = require('./routes/experience');
const listRoute = require('./routes/list');

app.use('/api/profile', profileRoute);
app.use('/api/articles', articleRoute);
app.use('/api/assets', assetsRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/list', listRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => logSuccess(`Backend running on port ${PORT}`));
