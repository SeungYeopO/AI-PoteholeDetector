FROM openjdk:17-jdk-alpine AS builder

WORKDIR /app
COPY . .

RUN chmod +x ./gradlew

# RUN ./gradlew test -i

RUN ./gradlew build -x test

ARG JAR_FILE_NAME=poppy-0.0.1-SNAPSHOT.jar

RUN cp ./build/libs/${JAR_FILE_NAME} ./app.jar

RUN apk update && apk add ffmpeg

ENTRYPOINT ["java", "-jar", "/app/app.jar", "--spring.profiles.active=docker"]
