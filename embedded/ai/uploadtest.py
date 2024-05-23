import gpsd
import time
import os
import requests
import cv2

gpsd.connect()



capture = cv2.VideoCapture(0)
capture.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
capture.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

# Connect to the local gpsd
while(1):
    # Get the current position
    packet = gpsd.get_current()
    # Get the latitude and longitude
    # latitude = packet.lat
    # longitude = packet.lon
    latitude = 35.178943
    longitude = 129.075885

    fileName = str(latitude)+'_'+str(longitude)+'.jpg'

    ret, frame = capture.read()
    cv2.imshow('Video Test',frame)
    if cv2.waitKey(1) != -1:
        cv2.imwrite(fileName, frame)
        with open(fileName, 'rb') as img:
            files = {'file': (fileName, img)}  
            # 'file'은 Spring의 MultipartFile 파라미터 이름과 일치해야 함
            data = {'latitude': latitude, 'longitude': longitude}
            try:
                response = requests.post(url, files=files, data=data)
                print("success")
            except requests.exceptions.RequestException as e:
                print(f'오류 발생: {e}')
      
    time.sleep(1)
