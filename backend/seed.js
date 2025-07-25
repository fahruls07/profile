const mongoose = require('mongoose');

/*function generateSlug(text) {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
}*/

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
    skills: [
      "Software Development LifeCycle", "CICD (Jenkins, ArgoCD)",
      "Google Cloud Platform (Instance, GKE, GCS, LoadBalancing, Google Cloud Monitoring, Google Artifactory, Google scheduler)",
      "AWS", "Alibaba cloud", "Containerization (Docker)", "Kubernetes",
      "Helm", "Terraform", "Ansible", "JavaScript", "React", "Node.js", "Docker", "MySQL", "MongoDB"
    ],
    languages: ["Indonesian", "English"],
    experiences: [
      {
        company: "FPT Software Indonesia",
        role: "Devops Engineer",
        year: "Nov 2023 - now",
        description: "CIMB Niaga project for Configuration infrastructure CRDE-Replatform on GCP, Implement CI/CD Pipeline and Maintenance Software Development Live Cycle in any environment (development, staging, and production), research and development best practice, also create documentation.",
        stack: [
          "GCP (Instance, GKE, GCS, Scheduler, LoadBalancer, Google Cloud Monitoring, Google Artifactory)",
          "Bitbucket", "Docker", "Kubernetes", "Jenkins", "Grafana", "Prometheus", "Terraform",
          "ElasticSearch", "Logstash", "Kibana", "shell scripting", "Python", "Bash Scripting"
        ],
        responsibilities: [
          "Configuration infrastructure CRDE-Replatform on GCP",
          "Implement CI/CD Pipeline",
          "Maintenance Software Development Live Cycle in any environment (development, staging, and production)",
          "Research and development best practice",
          "Create documentation"
        ],
        slug: "fpt"
      },
      {
        company: "RCTI+ (MNC Group)",
        role: "Devops Engineer",
        year: "Jan 2022 - Nov 2023",
        description: "Configuration infrastructure RCTI+ application, implement CI/CD pipeline and maintenance Software Development Live Cycle in any environment (development, staging, and production), research and development new technology, also create documentation.",
        stack: [
          "Alibaba Cloud (ECS, ACK, NFS, ApsaraDB MySQL, LoadBalancer, Alibaba Cloud DNS, CDN)",
          "Bitbucket", "Jira", "Docker", "Kubernetes", "kubesphere monitoring", "Jenkins",
          "Grafana", "Prometheus", "Kong API Gateway", "CloudFlare", "Kafka", "Redis", "Ansible",
          "shell scripting", "Python", "Bash Scripting"
        ],
        responsibilities: [
          "Configuration infrastructure RCTI+ application",
          "Implement CI/CD pipeline",
          "Maintenance Software Development Live Cycle in any environment (development, staging, and production)",
          "Research and development new technology",
          "Create documentation"
        ],
        slug: "rctiplus"
      },
      {
        company: "PT. Jojonomic",
        role: "Devops Engineer",
        year: "June 2021 - December 2021",
        description: "Configuration infrastructure Jojonomic application, implement CI/CD pipeline and maintenance Software Development Live Cycle in any environment (development, staging, and production), research and development new technology",
        stack: [
          "AWS Cloud", "Bitbucket", "Jira", "Docker", "Kubernetes", "Jenkins", "Terraform",
          "CloudFlare", "Ansible"
        ],
        responsibilities: [
          "Configuration infrastructure Jojonomic application",
          "Implement CI/CD pipeline",
          "Maintenance Software Development Live Cycle in any environment (development, staging, and production)",
          "Research and development new technology"
        ],
        slug: "jojonomic"
      },
      {
        company: "PT. Phintraco Counsulting (Phincon)",
        role: "Devops Engineer",
        year: "November 2019 - June 2021",
        description: "Telkomsel project for Maintenance Software Development Live Cycle in any environment (development, staging, and production), implement CI/CD pipeline and configuration infrastructure on premis server for MyTelkomsel application",
        stack: [
          "Jenkins", "Github", "Gitlab", "Jfrog-Artifactory", "Ansible", "Grafana", "Newrelic",
          "Dynatrace", "firebase", "linux server", "CloudFlare", "Kafka", "Redis", "Ansible",
          "Shell Scripting", "Python", "Bash Scripting"
        ],
        responsibilities: [
          "Maintenance Software Development Live Cycle in any environment (development, staging, and production)",
          "Implement CI/CD pipeline",
          "Configuration infrastructure on premis server for MyTelkomsel application"
        ],
        slug: "phincon"
      }
    ],
    educationFormal: [
      {
        institution: "Trisakti University",
        degree: "Bachelor Degree",
        major: "Electrical Engineering - Telecommunications",
        year: "2009 - 2013",
        gpa: "3.31"
      }
    ],
    educationNonFormal: [
      {
        course: "DevOps Engineer Bootcamp",
        institution: "Dicoding Indonesia",
        year: "2021",
        description: "Learned CI/CD, Kubernetes, Terraform, Docker, and DevSecOps best practices."
      },
      {
        course: "Cloud Practitioner Essentials",
        institution: "Amazon Web Services",
        year: "2020",
        description: "Fundamentals of AWS services, billing, security, and architecture principles."
      },
      {
        course: "Docker and Kubernetes: The Complete Guide",
        institution: "Udemy",
        year: "2020",
        description: "Hands-on Docker CLI, Dockerfile, images, and deploying apps with Kubernetes."
      }
    ],
    contact: {
      email: "fahrulsidik07@gmail.com",
      linkedin: "https://www.linkedin.com/in/fahrul-sidik-1433a3b7/",
      github: "https://github.com/fahruls07",
      whatsapp: {
        label: "Call / WhatsApp",
        number: "+6281234567890"
      }
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
