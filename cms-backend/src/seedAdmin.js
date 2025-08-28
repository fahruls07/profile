require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/cmsdb';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

async function run(){
  await mongoose.connect(MONGO);
  const exist = await User.findOne({ email: ADMIN_EMAIL });
  if (exist) {
    console.log('Admin already exists');
    process.exit(0);
  }
  const hash = await bcrypt.hash(ADMIN_PASSWORD, 10);
  await User.create({ email: ADMIN_EMAIL, passwordHash: hash, role: 'admin' });
  console.log('Admin created:', ADMIN_EMAIL);
  process.exit(0);
}

run().catch(e => { console.error(e); process.exit(1); });
