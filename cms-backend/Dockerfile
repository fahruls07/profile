FROM node:18-alpine

WORKDIR /app
COPY cms-backend/. .
RUN npm install

EXPOSE 5000
CMD ["node", "index.js"]