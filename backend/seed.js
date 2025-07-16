const mongoose = require('mongoose');

const profile = {
  name: "Fahrul Sidik",
  title: "DevOps Engineer",
  bio: "Hello, currently i am Devops Engineer since 2019.  Apart from that, i also have various experiences from 2013 in the telecommunication, IT, and banking industries. For more details, let's explore my profile web. Thank you :)",
  location: "Jakarta, Indonesia",
  email: "fahrulsidik07@gmail.com",
  skills: ["CICD", "SDLC", "Multicloud (GCP, AWS, Alibaba cloud)", "Containerization (Docker)", "Kubernetes", "Helm", "Terraform", "Ansible", "JavaScript", "React", "Node.js", "Docker", "MongoDB"],
  experience: [
    {
      company: "FPT Software Indonesia",
      role: "Devops Engineer",
      year: "Nov 2023 - now"
    }
  ],
  education: [
    {
      school: "Trisakti University",
      degree: "Electrical Engineering - Telecommunications",
      year: "2009 - 2013",
      GPA: "3.31"
    }
  ]
};

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  const Profile = mongoose.model('Profile', new mongoose.Schema({}, { strict: false }));
  return Profile.create(profile);
}).then(() => {
  console.log('✅ Data seeded');
  process.exit(0);
}).catch(err => {
  console.error('❌ Gagal:', err);
  process.exit(1);
});
