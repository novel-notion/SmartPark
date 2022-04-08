import json
import urllib.request

def process_art_data(url):
  resp = json.loads(urllib.request.urlopen(url).read().decode())
  l = []
  for entry in resp:
    lat = entry.get('latitude')
    if lat != None:
      lat = float(lat)
      lon = entry.get('longitude')
      if lon != None:
        lon = float(lon)
        typ = entry['type']
        if typ != None:
          inner = [lat,lon,typ]
          l.append(inner)
  return json.dumps(l)
