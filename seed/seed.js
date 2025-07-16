const mongoose = require('mongoose');
const profile = {
  name: "Fahrul Sidik",
  title: "Fullstack Developer",
  bio: "Saya seorang developer dengan minat di web development dan cloud.",
  skills: ["JavaScript", "React", "Node.js", "Docker", "MongoDB"],
  experience: [
    {
      company: "PT Contoh",
      role: "Backend Developer",
      year: "2022 - 2024"
    }
  ],
  education: [
    {
      school: "Universitas ABC",
      degree: "S1 Teknik Informatika",
      year: "2017 - 2021"
    }
  ]
};

mongoose.connect('mongodb://localhost:27017/resumedb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Profile = mongoose.model('Profile', new mongoose.Schema({}, { strict: false }));

Profile.create(profile).then(() => {
  console.log('Data seeded');
  process.exit();
});
