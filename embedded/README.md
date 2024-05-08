## 차량용 블랙박스 제작

본체 : Jetson Nano + WebCam

AI 포트홀 인식 : Yolo v5

포트홀 영상 처리 : Open Cv, Python

작성일 : 240422

OSY - 2024/04/22

jetson nano os 및 환경 설정 진행

memory swap, opencv까지 설정 완료

pytorch 및 torchvision 세팅 예정

---------------------------------

OSY - 2024/04/23

jetson nano os pytorch 설치 실패 수정 요망

pothole 데이터 Labeling 진행 약 60%완성

---------------------------------

OSY - 2024/04/24

manhole 데이터 Labeling 진행 약 35%완성

--------------------------------

OSY - 2024/04/25

manhole 데이터 Labeling 완성

jetson nano yolov5세텅 완료

공공단체에서 지원해준 포트홀 데이터 이미지 변환 코드 및 파일 커밋


--------------------------------

OSY - 2024/05/02

yolov5 모델 jetson nano에 porting 성공

--------------------------------

OSY - 2024/05/03

yolov5 모델 가속화 성공

-ubuntu20.04로 업그레이드

-python3.8.10버전으로 yolov5 및 cuda 동작 확인

-yolov5모델 학습한 가중치로 실시간 인식 동작 실행 성공, 송출 딜레이 평균 약 280ms정도

--------------------------------

OSY - 2024/05/08

yolov5 모델 경량화를 통해 영상 실시간성 향상

- avg: 171.3ms -> 71.2ms로 향상

-yolov5 모델 학습 파라미터 yolov5m -> yolov5s로 downgrade

-epoch: 50 -> 100으로 학습횟수 증가를 통해 모델 성능 향상

-모델이 Pothole, Manhole 탐지 시 이미지 저장 코드 개발 완료.
