# 원근 변환 (perspective.py)

import cv2
import numpy as np
import os
from time import time, sleep

path = 'C:\\Users\\SSAFY\\PycharmProjects\\OpenCV\\pothole240423_0501'
lst = os.listdir(path)
new_path = 'C:\\Users\\SSAFY\\Desktop\\pothole240424_0251'

num = 1;
for file_name in lst:
    img = cv2.imread(file_name)
    img = cv2.resize(img, dsize=(320, 240), interpolation=cv2.INTER_AREA)
    rows, cols = img.shape[:2]

    # ---① 원근 변환 전 후 4개 좌표
    pts1 = np.float32([[0, 0], [0, rows], [cols, 0], [cols, rows]])
    pts2 = np.float32([[100, 50], [10, rows - 50], [cols - 100, 50], [cols - 10, rows - 50]])

    # ---② 변환 전 좌표를 원본 이미지에 표시
    cv2.circle(img, (0, 0), 10, (255, 0, 0), -1)
    cv2.circle(img, (0, rows), 10, (0, 255, 0), -1)
    cv2.circle(img, (cols, 0), 10, (0, 0, 255), -1)
    cv2.circle(img, (cols, rows), 10, (0, 255, 255), -1)

    # ---③ 원근 변환 행렬 계산
    mtrx = cv2.getPerspectiveTransform(pts1, pts2)
    # ---④ 원근 변환 적용
    dst = cv2.warpPerspective(img, mtrx, (cols, rows))

    #cv2.imshow(file_name, img)
    new_name = 'crach_transform'
    #cv2.imshow(new_name + str(num), dst)
    cv2.imwrite(new_name + str(num) + '.jpeg', dst)
    num += 1
    cv2.waitKey(0)

cv2.destroyAllWindows()