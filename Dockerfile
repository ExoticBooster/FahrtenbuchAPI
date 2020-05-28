FROM node:14-alpine
WORKDIR /usr/app
USER root
COPY package*.json ./
RUN npm install
CMD [ "npm", "start" ]