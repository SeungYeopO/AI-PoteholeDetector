# -*- coding: utf-8 -*-
import cv2
import sys

# 웹캠 캡처
cap = cv2.VideoCapture(0)
w = round(cap.get(cv2.CAP_PROP_FRAME_WIDTH)) # width
h = round(cap.get(cv2.CAP_PROP_FRAME_HEIGHT)) #height
fps = cap.get(cv2.CAP_PROP_FPS)
delay = round(1000 / fps)
print(w)
print(h)
print(fps)

# 저장할 동영상 파일명 설정
out = cv2.VideoWriter('output.avi', cv2.VideoWriter_fourcc(*'XVID'), int(fps), (int(w),int(h)))

# 녹화 시작 시간 설정
start_time = None

# 녹화가 시작된 상태인지 확인하는 플래그
recording = False


while True:
    # 프레임 읽기
    ret, frame = cap.read()

    # 키보드 입력 받기
    key = cv2.waitKey(1) & 0xFF

    out.write(frame)


    # 키 입력 대기 (q를 누르면 종료)
    if key == ord('q'):
        break

    if cv2.waitKey(int(delay)) == 27:
        break


# 해제
cap.release()
out.release()
cv2.destroyAllWindows()
