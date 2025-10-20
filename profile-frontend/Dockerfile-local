FROM node:18-alpine

WORKDIR /app
COPY profile-frontend/. .
RUN npm install

EXPOSE 3000
CMD ["npm", "run", "dev", "--", "--host"]