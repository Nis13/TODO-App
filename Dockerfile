FROM node:20-alpine

WORKDIR /app


COPY package*.json .

RUN npm install

COPY . /app

EXPOSE 8000

CMD ["npm", "start"]