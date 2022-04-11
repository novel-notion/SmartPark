Plotly.setPlotConfig({mapboxAccessToken: 'pk.eyJ1IjoiZGpwYXJkbyIsImEiOiJjbDE0YmZlcDUwaHVjM2pvZGprenlqZnMzIn0.au05Z1P0yFZ6FeDhEc-A4A'});

var lots = {'Main/Bailey'               :   [42.95775, -78.816411],
            'Parker'                    :   [42.950376, -78.821787],
            'Abbott Faculty'            :	[42.955165, -78.819126],
            'Diefendorf Faculty/Staff'  :	[42.952088, -78.817549],
            'Goodyear Faculty'          : 	[42.956446, -78.815897],
            'Michael-Farber'            :	[42.954993, -78.814427],
            'Abbott Student'            :	[42.955415, -78.819475],
            'Allen'                     :	[42.957208, -78.818064],
            'Beck'                      : 	[42.951334, -78.822087],
            'Diefendorf Loop'           :	[42.953083, -78.817382],
            'Main Circle'               :	[42.954051, -78.819287]
};

var lotnames = [];
var latitudes = [];
var longitudes = [];
for (let key in lots) {
    lotnames.push(key);
    latitudes.push(lots[key][0]);
    longitudes.push(lots[key][1]);
};
var center_lat = (Math.min(...latitudes) + Math.max(...latitudes))/2;
var center_lon = (Math.min(...longitudes) + Math.max(...longitudes))/2;

var data = [{
  type: 'scattermapbox',
  mode: 'markers',
  text: lotnames,
  lon: longitudes,
  lat: latitudes,
  hoverinfo: 'text',
  //hovertemplate: ,
  marker: {
    size: 15,
    symbol: 'circle',   //won't accept anything else?
    opacity: .9,
    color: [10, 20, 30, 40, 50, 60, 70, 80, 90, 10, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 10, 20, 30, 40, 50],
    cmin: 0,
    cmax: 100,
    colorscale: 'Rainbow',  //also 'Rainbow', 'Jet', 'Portland', '[[0, 'rgb(0,0,0)'], [1, 'rgb(255,255,255)']]'
    autocolorscale: false,
    colorbar: {
      title: 'Capacity',
      ticksuffix: '%',
      tickfont: {
        size: 11
      },
      nticks: 10,
      tickmode: 'auto',
      showticksuffix: 'all'
    },
  },
  name: 'UB South Campus Lots',
}];

var layout = {
  //title: 'UB South Campus Lots',
  font: {
    family: 'Droid Serif, serif',
    size: 6
  },
  titlefont: {
    size: 16
  },
  margin : {
    autoexpand : false,
  },
  autosize : true,
  width : 1000,
  height : 800,
  mapbox: {
    center: {
      lat : center_lat,
      lon : center_lon
    },
    style: 'outdoors',    //'satellite-streets'
    zoom: 14
  }
};

Plotly.newPlot("southcampus", data, layout);
