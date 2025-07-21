const mongoose = require('mongoose');
mongoose.connect('mongodb://mongo:27017/resumedb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  const Profile = mongoose.model('Profile', new mongoose.Schema({}, { strict: false }));
  
  const profile = {
  name: "Fahrul Sidik",
  title: "DevOps Engineer",
  bio: "A Devops Engineer since 2019, Highly skilled DevOps Engineer with over 6 years of experience driving end-to-end SDLC and implementing robust CI/CD pipelines across various industries including telecommunications, banking, HR applications, and entertainment. Proven expertise in containerization with Docker and Kubernetes, and infrastructure automation using Ansible and Terraform. Experienced in working with multi-cloud environments including AWS, GCP, and Alibaba Cloud. Adept at delivering scalable, secure, and automated solutions that enhance operational efficiency and deployment velocity. Also have profesional experiences since 2013. For more details, let's explore my web-profile. Thank you :)",
  location: "Jakarta, Indonesia",
  email: "fahrulsidik07@gmail.com",
  skills: ["Software Development LifeCycle", "CICD (Jenkins, ArgoCD)", "Google Cloud Platform (Instance, GKE, GCS, LoadBalancing, Google Cloud Monitoring, Google Artifactory, Google scheduler)", "AWS, Alibaba cloud)", "Containerization (Docker)", "Kubernetes", "Helm", "Terraform", "Ansible", "JavaScript", "React", "Node.js", "Docker", "MySQL","MongoDB"],
  languages: ["Indonesian","English"],
  experiences: [
    {
      company: "FPT Software Indonesia",
      role: "Devops Engineer",
      year: "Nov 2023 - now",
      description: "Configuration infrastructure on GCP for CRDE-Replatform application, Implement CI/CD Pipeline and Maintenance Software Development Live Cycle in any environment (development, staging, and production).",
      stack: ["GCP (Instance, GKE, GCS, Scheduler, LoadBalancer, Google Cloud Monitoring, Google Artifactory)", "Bitbucket", "Docker", "Kubernetes", "Jenkins", "Grafana", "Prometheus", "Terraform", "ElasticSearch", "Logstash", "Kibana"]
    },
    {
      company: "RCTI+ (MNC Group)",
      role: "Devops Engineer",
      year: "Jan 2022 - Nov 2023",
      description: "Configuration infrastructure RCTI+, Implement CI/CD Pipeline and Maintenance Software Development Live Cycle in any environment (development, staging, and production).",
      stack: ["Alibaba Cloud (ECS, ACK, NFS, ApsaraDB MySQL, LoadBalancer, Alibaba Cloud DNS)", "Bitbucket", "Jira", "Docker", "Kubernetes", "Jenkins", "Grafana", "Prometheus", "Kong API Gateway", "CloudFlare", "Kafka", "Redis", "Ansible"]
    }
  ],
  education: [
    {
      school: "Trisakti University",
      degree: "Electrical Engineering - Telecommunications",
      year: "2009 - 2013",
      GPA: "3.31"
    }
  ],
  contact: {
    email: "fahrulsidik07@gmail.com",
    linkedin: "https://www.linkedin.com/in/fahrul-sidik-1433a3b7/",
    github: "https://github.com/fahruls07"
  }
};


  return Profile.deleteMany({}).then(() => Profile.create(profile));
}).then(() => {
  console.log('✅ Data seeded');
  process.exit(0);
}).catch(err => {
  console.error('❌ Gagal:', err);
  process.exit(1);
});