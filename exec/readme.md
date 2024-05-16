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
- DB
  - MariaDB 11.3.2
  - MongoDB version v7.0.9
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
  - React 18.2.0
  - NodeJS 20.11.1
- Embedded
  - Jetson nano
    - UBUNTU 18.04.6
    - Python 3.6.9
    - Yolo v5
    - OpenCV 4.5.5
    - Pytorch 1.8.0
    - Torchvision 0.9.0

## 포팅 메뉴얼

### 1. 서버에 Docker 설치
- [https://docs.docker.com/engine/install/ubuntu/](https://docs.docker.com/engine/install/ubuntu/) 참고

```bash
for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg; done
```

```bash
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$UBUNTU_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

### 2. Docker를 통해 Jenkins container 설치

- `sudo ufw` 로 포트 개방
    
    ```bash
    sudo ufw status #열려있는 포트 확인
    sudo ufw allow 22 #ssh 포트
    sudo ufw allow 8080 #Jenkins 포트
    sudo ufw show added #등록한 포트 조회
    sudo ufw enable #ufw 활성화
    ```
    
- Jenkins container 설치
    
    ```bash
    sudo docker run -itd \
    -p 8080:8080 \
    -p 50000:50000 \
    -v /home/ubuntu/jenkins-data:/var/jenkins_home \
    -v /$(which docker):/usr/bin/docker \
    -v /var/run/docker.sock:/var/run/docker.sock \
    --name jenkins jenkins/jenkins:lts
    ```
    
- 서버 아이피와 포트로 Jenkins 접속
    
    ex) k10c106.p.ssafy.io:8080
    
    - 이 때, Jenkins에서 패스워드를 요구한다. 패스워드는 서버 콘솔에서 `sudo docker logs jenkins` 를 입력해서 찾는다.
    - 이후 jenkins 설정을 마치고 접속하면 jenkins dashboard가 나온다.
  
### 3. Jenkins 설정

- Plugin 설치(Jenkins 관리)
    - docker 관련 플러그인 설치
        - Docker API Plugin
        - Docker Commons Plugin
        - Docker Pipeline
        - Docker plugin
    - Gitlab 관련 플러그인 설치
        - Gitlab API Plugin
        - GitLab Authentication plugin
        - GitLab Branch Source Plugin
        - Gitlab Merge Request Builder
        - Generic Webhook Trigger Plugin
- Credentials 설정(Jenkins 관리)
    - Jenkins System의 Domains의 (global) 오른쪽 화살표나, global을 타고 들어가는 링크에 있는 곳에 Add Credentials 클릭
    - Kind : Username with password
    - Scope : Global
    - Username : Gitlab 계정 아이디
    - Password : Gitlab project token(모든 권한이 있는 maintenance 계정이어야 함)
- 배포할 프로젝트(Gitlab)를 Pipeline으로 구축(새로운 Item)
    - item 이름 설정
    - Pipeline 타입으로 설정
    - Build Triggers 설정(이 때 Gitlab과 번갈아 작업해야함)
        - Jenkins : Build when a change is pushed to GitLab. 체크
        - Jenkins : 체크한 항목을 보면 GitLab webhook URL이 있는데 이 URL을 복사
        - GitLab : 진행중인 프로젝트의 Settings 항목의 Webhooks 선택
        - GitLab : Add new webhook 클릭
        - Gitlab : URL에 복사한 URL을 붙여넣기
        - Jenkins : 고급 옵션을 펼쳐, 하단의 Secret token을 Generate한 후 복사
        - GitLab : Secret token에 생성한 토큰을 붙여넣기
        - GitLab : Trigger 항목에 Push event 체크, 여기서 All branches를 체크하여 모든 Push events에 대해 신호를 받거나, 또는 Wildcard pattern으로 특정 branch 신호만 받을 수 있다.
            
            wildcard pattern ex) master
            
        - GitLab : 설정 저장
    - Pipeline 설정
        - Definition : Pipeline script from SCM 선택, 아래에 추가 항목 생성
        - SCM : Git 선택, 아래에 추가 항목 생성
        - Repositories에 배포할 Repository 생성하기
        - Repository URL : 프로젝트의 git URL 붙여넣기
        - Credentials : 앞에서 작성한 Credential을 설정
        - Branches to build : 신호를 받으면 실행할 브랜치를 작성
        - Repository browser는 자동에서 변경하지 않음
        - Script Path : Jenkinsfile
        - 설정을 저장

### 4. 배포 환경 설정

- 기본 배포 설정을 취소

```bash
sudo apt install nginx -y

sudo unlink /etc/nginx/sites-enabled/default
```
- http, https 포트를 개방한다

```bash
sudo ufw allow 80
#http://
sudo ufw allow 443
#https://
sudo ufw enable
```
  - SSL 인증서를 발급받고 HTTPS를 사용하기 위해 certbot을 설치한다.

```bash
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx
```

- 그 다음 SSL 인증서를 발급받는다.

```bash
sudo certbot --nginx -d (domain 주소)
```

- 자율 프로젝트에서는 domain 주소를 아래와 같이 입력했다.

```bash
sudo certbot --nginx -d k10c106.p.ssafy.io
```
- 다음으로 reverse-proxy.conf 파일을 다음과 같이 작성했다.
    
    ```bash
    server {
        server_name k10c106.p.ssafy.io;

        access_log /var/log/nginx/reverse-access.log;
        error_log /var/log/nginx/reverse-error.log;

        location / {
                proxy_pass http://127.0.0.1:3000;
        }

        location /api {
                client_max_body_size 20M;
                proxy_pass http://127.0.0.1:8081/api;
        }

    listen [::]:443 ssl ipv6only=on; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/k10c106.p.ssafy.io/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/k10c106.p.ssafy.io/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

    }
    server {
            server_name k10c106.p.ssafy.io;

            access_log /var/log/nginx/manager-access.log;
            error_log /var/log/nginx/manager-error.log;

            location / {
                    proxy_pass http://127.0.0.1:3001;
            }

        listen [::]:3002 ssl ipv6only=on; # managed by Certbot
        listen 3002 ssl; # managed by Certbot
        ssl_certificate /etc/letsencrypt/live/k10c106.p.ssafy.io/fullchain.pem; # managed by Certbot
        ssl_certificate_key /etc/letsencrypt/live/k10c106.p.ssafy.io/privkey.pem; # managed by Certbot
        include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
        ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

    }
    server {
        if ($host = k10c106.p.ssafy.io) {
            return 301 https://$host$request_uri;
        } # managed by Certbot


            listen 80;
            listen [::]:80;
            server_name k10c106.p.ssafy.io;
        return 404; # managed by Certbot


    }
    ```
    
- 위처럼 작성한 경우, 일반적인 도메인 접근은 client port로, /api로의 접근은 server port로 연결된다.
- react로 관리자 웹도 배포하고 있기 때문에, 3002번 포트를 개방한 후 해당 포트로 관리자 웹으로 연결되도록 설정했다.
- `sudo ln -s /etc/nginx/sites-available/reverse-proxy.conf /etc/nginx/sites-enabled/` 명령을 통해 설정 파일을 `sites-enabled`에 연결한다.
- 이후 `sudo nginx -t` 로 설정 파일을 검사한 다음, 문제가 없다면 `sudo service nginx restart` 명령으로 nginx를 재시작한다.
