FROM node:14.19.1-alpine

WORKDIR /app

COPY ["package.json", "./"]

RUN ls
RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]