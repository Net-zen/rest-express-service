FROM node:14.17.1-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN chmod 777 ./wait-for
CMD [ "npm", "run", "dev" ]
