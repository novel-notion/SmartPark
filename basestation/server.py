from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def index():
   return render_template("index.html")

@app.route('/northcampus.js')
def northcampus():
   return render_template("static/northcampus.js")

@app.route('/southcampus.js')
def southcampus():
   return render_template("static/southcampus.js")

if __name__ == '__main__':
   app.run(host='0.0.0.0', port=8080)
