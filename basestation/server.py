import bottle
import art

@bottle.route("/")
def html():
  return bottle.static_file("index.html", root="")

@bottle.route("/map.js")
def js():
  return bottle.static_file("map.js", root="")

@bottle.route("/art")
def get_art_data():
  return art.process_art_data('https://data.buffalony.gov/resource/v5df-q4ru.json')

bottle.run(host="0.0.0.0", port=8080, debug=True)
