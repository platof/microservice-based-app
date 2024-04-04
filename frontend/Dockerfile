FROM node:13.14-buster

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
RUN npm run build:production

EXPOSE 3000

CMD ["npm", "run", "start:production"]
