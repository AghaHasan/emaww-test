# syntax=docker/dockerfile:1

FROM node:14.17.3

WORKDIR /

# Wildcard used to copy to container "package.json" AND "package-lock.json"
COPY ./package*.json ./
RUN npm install
COPY ./app.js ./

CMD ["npm","start"]