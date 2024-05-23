import gpsd
import time
import os

gpsd.connect()

# Connect to the local gpsd
while(1):
    # Get the current position
    packet = gpsd.get_current()
    # Get the latitude and longitude
    latitude = packet.lat
    longitude = packet.lon
    print("Latitude:", latitude)
    print("Longitude:", longitude)
    time.sleep(1)