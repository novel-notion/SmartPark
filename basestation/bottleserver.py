import bottle

@bottle.route("/")
def index():
  return bottle.static_file("index.html", root="")

bottle.run(host="0.0.0.0", port=8080, debug=True)