import serial
import time
import requests

# configure port
ser = serial.Serial(
    port = '/dev/ttyUSB0', 
    baudrate = 38400,
    timeout = 1,
    parity = serial.PARITY_NONE,
    stopbits = serial.STOPBITS_ONE,
    bytesize =  serial.EIGHTBITS
    )

cooldown = 5 # length of time until tag can be read again

recentTags = {}

lotID = 18 # ketter

url = "http://ubsmartpark.com/get_rfid"
#url = "http://127.0.0.1:8080/get_rfid"

while True:
#    print("recent tags: " + str(recentTags))
    tagRead = ser.read(ser.inWaiting())

    if len(tagRead) < 32: 
        print("No tag detected")

    else:
        tagID = tagRead.strip()
        
        if tagID not in recentTags:
            recentTags[tagID] = int(time.time())
            msg =  requests.post(url, data = {lotID:tagID}) 
            print(msg.text)



    for tagIDKey in recentTags.copy():
        if int(time.time()) - recentTags[tagIDKey] > cooldown:
            del recentTags[tagIDKey]

    time.sleep(0.1)
    ser.write(bytearray([0x0A, 0x51, 0x0D]))
