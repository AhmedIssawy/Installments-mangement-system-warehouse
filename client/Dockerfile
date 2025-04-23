FROM node:23-alpine3.20

WORKDIR /app/frontend

COPY package*.json .

RUN npm ci

COPY . .

