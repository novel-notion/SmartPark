from flask import Flask, render_template, request
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
@application.route('/bruh', methods = ['POST'])
def recieve_scan():
    data = request.form
    return data['bruh']

if __name__ == '__main__':
   application.run(host='0.0.0.0', port=8080)
