const express = require('express');
const path = require('path');
const { getFilesWithExtension } = require('../utils/getFilesWithExtension');

const router = express.Router();

// Path folder di public (pastikan di-mount di Docker)
const bannerDir = path.join(process.cwd(), 'public/assets/banner');
const logoDir = path.join(process.cwd(), 'public/assets/logos');

// GET daftar banner
router.get('/banners', (req, res) => {
  const banners = getFilesWithExtension(bannerDir);
  res.json({ banners });
});

// GET daftar logo
router.get('/logos', (req, res) => {
  const logos = getFilesWithExtension(logoDir);
  res.json({ logos });
});

module.exports = router;
