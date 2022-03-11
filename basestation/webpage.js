function loadMap(){
  Plotly.setPlotConfig({mapboxAccessToken: 'pk.eyJ1IjoiZGpwYXJkbyIsImEiOiJjanRldWlpYXEwMDJhNDRvY2wwdnRuMWQyIn0.gNvZYUl8tJAUN0aAmcbojw'});
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if (this.readyState === 4 && this.status === 200){
      var mapParams = getMapParams(this.response);
      Plotly.plot('map', mapParams.data, mapParams.layout);  
    }
  };
  xhttp.open("GET", "/art");
  xhttp.send();
}

function setupMapData(list){
  var lat = [];
  var lon = [];
  var type = [];
  for (var i of list){
    lat.push(i[0]);
    lon.push(i[1]);
    type.push(i[2]);
  }
  var data = [{
  'type':'scattermapbox',
  'mode':'markers',
  'marker': {
    'size':5,
    'color':'rgb(255,0,0)'
  },
  'lat':lat,
  'lon':lon,
  'text':type,
  }] 
  return data
}

function findMapCenter(list){
  var lat = [];
  var lon = [];
  for (var i of list){
    lat.push(i[0]);
    lon.push(i[1]);
  }
  var avglat = (Math.max(...lat) + Math.min(...lat))/2
  var avglon = (Math.max(...lon) + Math.min(...lon))/2
  return [avglat, avglon]
}

function setupMapLayout(list){
  var layout = {
  'mapbox': {
    'style':'satellite-streets',
    'zoom':11,
    'center': {
      'lat':findMapCenter(list)[0],
      'lon':findMapCenter(list)[1]
      },
    },
  }
  return layout
}

function getMapParams(s){
  list = JSON.parse(s)
  return {'data':setupMapData(list), 'layout':setupMapLayout(list)}
}
