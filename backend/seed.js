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
      "Google Cloud Platform (Instance, GKE (Google Kubernetes Enginee), GCS (Google Cloud Storage), LoadBalancing, Google Cloud Monitoring, Google Artifactory, Google scheduler)",
      "AWS (ECS (Elastic Container Service), S3 Bucket, EC2 (Elastic Compute Cloud), ELB (Elastic Load Balancing), RDS (MySQL), Route53)", "Alibaba Cloud (ECS, ACK, NFS, ApsaraDB MySQL, LoadBalancer, Alibaba Cloud DNS, CDN)", "Containerization (Docker)", "Kubernetes",
      "Helm", "Terraform", "Ansible", "JavaScript", "React", "Node.js", "Docker", "MySQL", "MongoDB"
    ],
    languages: ["Indonesian", "English"],
    experiences: [
      {
        company: "FPT Software Indonesia",
        role: "Devops Engineer",
        startDate: "Nov 2023",
        endDate: "now",
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
        startDate: "Jan 2022",
        endDate: "Nov 2023",
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
        startDate: "June 2021",
        endDate: "Dec 2021",
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
        startDate: "Nov 2019",
        endDate: "June 2021",
        description: "Telkomsel project for Maintenance Software Development Live Cycle in any environment (development, staging, and production), implement CI/CD pipeline and configuration infrastructure on premis server for MyTelkomsel application",
        stack: [
          "Jenkins", "Github", "Gitlab", "Jfrog-Artifactory", "Ansible", "Grafana", "Newrelic",
          "Dynatrace", "firebase", "linux server", "CloudFlare", "Kafka", "Redis", "Ansible",
          "Shell Scripting", "Python", "Bash Scripting", "splunk"
        ],
        responsibilities: [
          "Maintenance Software Development Live Cycle in any environment (development, staging, and production)",
          "Implement CI/CD pipeline",
          "Configuration infrastructure on premis server for MyTelkomsel application"
        ],
        slug: "phincon"
      },
      {
        company: "PT. Infomedia Solusi Humanika (Mitra Adiperkasa Group)",
        role: "System Engineer",
        year: "October 2017 - November 2019",
        startDate: "Oct 2017",
        endDate: "Nov 2019",
        description: "Maintenance and configuration server, network, and electrical Data Center Ministry Transportation, Jakarta",
        stack: [
          "Linux and Windows Server", "VMWare", "PROXMOX", "Apache Tomcat", "MySQL", "Check-MK Monitoring", "Nagios", "HP and IBM physical server and storage"
        ],
        responsibilities: [
          "Maintenance and Monitoring Service Server in Data Center KementrianPerhubungan",
          "Trouble Shooting on site or by Remote Access",
          "Install and configure server according request by customer (Apache, MySQL, Galera Cluster, VMWare, Proxmox)",
          "Housekeeping Storage Server"
        ],
        slug: "infomedia"
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
        course: "Amazon Web Services (AWS) - Zero to Hero",
        institution: "Udemy - BackSpace Academy",
        year: "2019",
        description: "Fundamentals of AWS services, billing, security, and architecture principles. Create an AWS EC2 WordPress Web server. Launch and connect to an AWS RDS relational database server. Create a highly available and fault tolerant back-end for NodeJS applications with AWS Elastic Beanstalk, Store and retrieve files from AWS S3. Send email with AWS SES, Create Alarms with AWS CloudWatch, and Use the AWS Command Line Interface"
      },
      {
        course: "Become a DevOps Pro - From basics to advanced topics",
        institution: "Udemy - Edyoda",
        year: "2019",
        description: "Learn what is DevOps and why it is becoming popular in IT industry. Learn the fundamental principles of DevOps. Understand what is a DevOps pipeline. Learn how to use the CI/CD tool - Jenkins. Learn to use source code management tool - Git"
      },
      {
        course: "Master Azure Fundamentals: Learn Cloud Computing, Security, Scalability & Cost Management for the AZ-900 Certification!",
        institution: "Udemy - SkillTech Club",
        year: "2020",
        description: "Define cloud computing concepts and describe different cloud service models. Identify core Azure services and classify them into compute, networking, and storage. Compare Azure pricing models and calculate estimated costs for resources, Assess Azure security and distinguish governance, compliance, and identity management tools. Evaluate best practices and plan for the AZ-900 certification exame, images, and deploying apps with Kubernetes."
      },
      {
        course: "Master Azure Fundamentals: Learn Cloud Computing, Security, Scalability & Cost Management for the AZ-900 Certification!",
        institution: "Udemy - SkillTech Club",
        year: "2020",
        description: "Define cloud computing concepts and describe different cloud service models. Identify core Azure services and classify them into compute, networking, and storage. Compare Azure pricing models and calculate estimated costs for resources, Assess Azure security and distinguish governance, compliance, and identity management tools. Evaluate best practices and plan for the AZ-900 certification exame, images, and deploying apps with Kubernetes."
      }
    ],
    contact: {
      email: "fahrulsidik07@gmail.com",
      linkedin: "https://www.linkedin.com/in/fahrul-sidik-1433a3b7/",
      github: "https://github.com/fahruls07",
      whatsapp: {
        label: "Call / WhatsApp",
        number: "+6281294901023"
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
