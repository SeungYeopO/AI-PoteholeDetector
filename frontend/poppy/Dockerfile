FROM node:20.11.1

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm i

COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev"]