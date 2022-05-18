from flask import Flask, render_template, request, send_from_directory, send_file
import json
import sqlite3
from database import process_tag, current_data

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

@application.route('/database')
def push_update():
   return current_data()
      
@application.route('/get_rfid', methods = ['POST'])
def recieve_scan():
    response = request.form.to_dict()
    process_tag(response)
    # response is a dicionary {LotID:TagID} 
    return ("RFID Scan Recieved")

if __name__ == '__main__':
   application.run(host='0.0.0.0', port=8080, threaded=True)
