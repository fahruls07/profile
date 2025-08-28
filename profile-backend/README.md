# Resume Backend API
This is the backend API for a personal DevOps resume website, built with Node.js, Express, and MongoDB. It serves dynamic profile data to the frontend.


## Features
- REST API built with Express.js
- MongoDB for data persistence (using Mongoose)
- Docker-ready
- Easily extendable (Experiences, Education, Contact, etc.)


## Endpoints
- `GET /api/profile` - Get profile data

## Folder Structure
Root
├── index.js # Main server file
├── models/ # Mongoose schema(s)
│ └── Profile.js
├── routes/ # API routes
│ └── profile.js
├── seed/ # Optional: seed file to insert default data
│ └── seedProfile.js
├── Dockerfile # Docker configuration
├── package.json
└── README.md


## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB instance
- Docker (optional)


### Run locally
```bash
npm install
MONGO_URI="your-mongo-uri" node index.js

### Run With Docker
docker build -t resume-backend .
docker run -p 5000:5000 -e MONGO_URI="your-mongo-uri" resume-backend


