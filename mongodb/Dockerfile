FROM mongo:latest

COPY ./mongo-init.js /docker-entrypoint-initdb.d/mongo-init.js

RUN chmod 644 /docker-entrypoint-initdb.d/mongo-init.js
