const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

// login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const u = await User.findOne({ email });
  if (!u) return res.status(401).json({ message: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, u.passwordHash);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: u._id, email: u.email, role: u.role }, JWT_SECRET, { expiresIn: '12h' });
  res.json({ token });
});

// optional register (you can disable in production)
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  if (await User.findOne({ email })) return res.status(400).json({ message: 'User exists' });
  const hash = await bcrypt.hash(password, 10);
  const u = new User({ email, passwordHash: hash });
  await u.save();
  res.json({ ok: true });
});

module.exports = router;
