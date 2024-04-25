FROM openjdk:17-jdk-alpine AS builder

WORKDIR /app
COPY . .

RUN chmod +x ./gradlew

RUN ./gradlew --daemon

RUN ./gradlew

RUN ./gradlew build

RUN ls -l ./build/libs/

ARG JAR_FILE_NAME=poppy-0.0.1-SNAPSHOT.jar

RUN cp ./build/libs/${JAR_FILE_NAME} ./app.jar

ENTRYPOINT ["java", "-jar", "/app/app.jar"]