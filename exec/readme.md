# 빌드 및 배포 정리

## 사용 프로그램 및 프레임워크

### 배포 환경
- AWS EC2
  - UBUNTU 20.04.6
- AWS S3
- Docker
  - Docker version 26.0.2
- Jenkins
  - Jenkins 2.440.3

### 프레임워크
- Server
  - Spring Boot 3.2.5
  - Dependencies
    - org.springframework.boot:spring-boot-starter-actuator
    - org.springframework.boot:spring-boot-starter-data-jpa
    - org.springframework.boot:spring-boot-starter-web
    - org.mariadb.jdbc:mariadb-java-client:3.3.3
    - org.hibernate:hibernate-spatial:6.4.4.Final
    - org.hibernate:hibernate-core:6.4.4.Final
  	- com.amazonaws:aws-java-sdk-s3:1.12.712
  	- org.springframework.boot:spring-boot-starter-data-mongodb
  	- org.projectlombok:lombok
  	- org.springframework.boot:spring-boot-devtools
  	- org.springframework.boot:spring-boot-starter-test
  	- net.bramp.ffmpeg:ffmpeg:0.6.2
  - JDK 17
- Client
  - 