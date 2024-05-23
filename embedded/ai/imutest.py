import os
import sys
import time
import math
import smbus
import numpy as np

from imusensor.MPU9250 import MPU9250
from imusensor.filters import kalman 

address = 0x68
bus = smbus.SMBus(1)
imu = MPU9250.MPU9250(bus, address)
imu.begin()

imu.loadCalibDataFromFile("/home/jetson/Desktop/calib.json")

sensorfusion = kalman.Kalman()

imu.readSensor()
imu.computeOrientation()
sensorfusion.roll = imu.roll
sensorfusion.pitch = imu.pitch
sensorfusion.yaw = imu.yaw

count = 0
rollo = 0
rolle = 0
pitcho = 0
pitche = 0
yawo = 0
yawe = 0

currTime = time.time()
while True:
    imu.readSensor()
    imu.computeOrientation()
    newTime = time.time()
    dt = newTime - currTime
    currTime = newTime
    sensorfusion.computeAndUpdateRollPitchYaw(imu.AccelVals[0], imu.AccelVals[1], imu.AccelVals[2], imu.GyroVals[0], imu.GyroVals[1], imu.GyroVals[2],\
												imu.MagVals[0], imu.MagVals[1], imu.MagVals[2], dt)
    print("Kalmanroll:{0} KalmanPitch:{1} KalmanYaw:{2} ".format(sensorfusion.roll, sensorfusion.pitch, sensorfusion.yaw))
    
    if rolle != 0 and rollo != 0 and pitche !=0 and pitcho !=0 and yawe != 0 and yawo != 0 and abs(rolle - rollo) > 5 and abs(pitche - pitcho) < 5 and abs(yawe - yawo) < 5:
        print("crush")

    if count/2 == 0:
        rolle = sensorfusion.roll
        pitche = sensorfusion.pitch
        yawe = sensorfusion.yaw
    else:
        rollo = sensorfusion.roll
        pitcho = sensorfusion.pitch
        yawo = sensorfusion.yaw
	
    count += 1
    time.sleep(0.1)