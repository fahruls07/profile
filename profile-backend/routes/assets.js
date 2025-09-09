const express = require('express');
const path = require('path');
const { getFilesWithExtension } = require('../utils/getFilesWithExtension');
const { logInfo, logWarn, logError, logSuccess } = require('../utils/logger');

const router = express.Router();

// Path folder di public (pastikan di-mount di Docker)
const bannerDir = path.join(process.cwd(), 'public/assets/banner');
const logoDir = path.join(process.cwd(), 'public/assets/logos');

// GET daftar banner
router.get('/banners', (req, res) => {
  try {
    const banners = getFilesWithExtension(bannerDir);
    logSuccess(`Found ${banners.length} banners`);
    res.json({ banners });
  } catch (err) {
    logError('Error fetching banners:', err.message);
    res.status(500).json({ error: 'Failed to fetch banners' });
  }
});

// GET daftar logo
router.get('/logos', (req, res) => {
  try {
    const logos = getFilesWithExtension(logoDir);
    logSuccess(`Found ${logos.length} logos`);
    res.json({ logos });
  } catch (err) {
    logError('Error fetching logos:', err.message);
    res.status(500).json({ error: 'Failed to fetch logos' });
  }
});

module.exports = router;
