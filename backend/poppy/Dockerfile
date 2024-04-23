FROM openjdk:17-jdk-alpine AS builder

WORKDIR /app
COPY . .

RUN chmod +x ./gradlew

RUN ./gradlew

RUN ./gradlew build

RUN ls -l ./build/libs/

ARG JAR_FILE=./build/libs/*.jar
COPY ${JAR_FILE} app.jar

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
