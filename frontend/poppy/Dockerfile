# 기본 이미지
FROM node:20 as builder

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 파일 복사 및 설치
COPY package.json package-lock.json ./
RUN npm install

# 앱 파일 복사 및 빌드
COPY . .
RUN npm run build

# Nginx를 사용하여 빌드된 앱 제공
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
