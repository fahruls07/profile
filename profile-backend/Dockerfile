FROM node:18-alpine

WORKDIR /app
COPY profile-backend/. .
RUN npm install

EXPOSE 5000
CMD ["node", "index.js"]