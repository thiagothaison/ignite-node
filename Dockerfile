FROM node:latest

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE "${HTTP_PORT}"

CMD ["npm", "run", "dev"]