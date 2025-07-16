const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const profileSchema = new mongoose.Schema({}, { strict: false });
const Profile = mongoose.model('Profile', profileSchema);

app.get('/api/profile', async (req, res) => {
  const profile = await Profile.findOne();
  res.json(profile);
});

app.listen(5000, () => console.log('Backend running on port 5000'));
