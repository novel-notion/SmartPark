from flask import Flask, render_template, request, send_from_directory
import json
import sqlite3
application = Flask(__name__)

@application.route('/')
def index():
   return render_template("index.html")

@application.route('/northcampus.js')
def northcampus():
   return render_template("static/northcampus.js")

@application.route('/southcampus.js')
def southcampus():
   return render_template("static/southcampus.js")
@application.route('/rfid_reader')
def give_rfid_file():
    return send_from_directory("static","rfid_reader.py")
@application.route('/get_rfid', methods = ['POST'])
def recieve_scan():

    response = request.form.to_dict()
    # response is a dicionary {LotID:TagID} 
    return ("RFID Scan Recieved")

if __name__ == '__main__':
   application.run(host='0.0.0.0', port=8080)
