# 빌드 스테이지
FROM node:20 AS build-stage
WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# 운영 스테이지
FROM node:20
WORKDIR /app
COPY --from=build-stage /app/dist /app
RUN npm install -g serve
CMD ["serve", "-s", ".", "-l", "3000"]
EXPOSE 3000
