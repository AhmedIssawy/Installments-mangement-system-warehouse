FROM node:23-alpine3.20

WORKDIR /app/backend

COPY package*.json .
RUN npm ci

COPY . .

EXPOSE 5000

CMD ["npm", "run", "start"]