function loadSouthCampus(){
  Plotly.setPlotConfig({mapboxAccessToken: 'pk.eyJ1IjoiZGpwYXJkbyIsImEiOiJjbDE0YmZlcDUwaHVjM2pvZGprenlqZnMzIn0.au05Z1P0yFZ6FeDhEc-A4A'});
  
  mapWidth = document.documentElement.clientWidth;
  mapHeight = 1/2*(document.documentElement.clientHeight - document.getElementById("header").offsetHeight - document.getElementById("defaultOpen").clientHeight - 2);
  var capacity_array = capacity_array = [[10, 100], [20, 100], [30, 100], [40,100], [50,100], [60,100], [70,100], [80,100], [90,100], [10,100], [10,100]];
  params = getSouthMapParams(capacity_array, mapWidth, mapHeight);
  Plotly.newPlot("southcampus", params.data, params.layout, params.config);
} 

function getSouthMapParams(capacity_array, mapWidth, mapHeight){
  var lots = {'Main/Bailey'                       : [42.95775, -78.816411],
              'Parker'                            : [42.950376, -78.821787],
              'Abbott B<br>(Faculty/Staff)'       :	[42.955165, -78.819126],
              'Diefendorf<br>(Faculty/Staff)'     :	[42.952088, -78.817549],
              'Goodyear<br>(Faculty/Staff)'       : [42.956446, -78.815897],
              'Michael-Farber<br>(Faculty/Staff)' :	[42.954993, -78.814427],
              'Abbott A'                          :	[42.955415, -78.819475],
              'Allen'                             :	[42.957208, -78.818064],
              'Beck'                              : [42.951334, -78.822087],
              'Diefendorf Loop'                   :	[42.953083, -78.817382],
              'Main Circle'                       :	[42.954051, -78.819287]
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

  var capacity_percentages = []
  for (i=0; i<capacity_array.length; i++){
    capacity_percentages[i] = Math.round(capacity_array[i][0]/capacity_array[i][1]*100);
  };  

  var data = [{
    type: 'scattermapbox',
    mode: 'markers',
    text: lotnames,
    lon: longitudes,
    lat: latitudes,
    marker: {
      size: 14,
      sizemin: 18,
      symbol: 'circle',
      opacity: .9,
      color: capacity_percentages,
      cmin: 0,
      cmax: 100,
      autocolorscale: false,
      colorscale: 'Rainbow',  //also 'Rainbow', 'Jet', 'Portland', "[[0, 'rgb(0,0,0)'], [1, 'rgb(255,255,255)']]"
      colorbar: {
        title: {
          text : 'Capacity',
          side : 'top',
          font : {
            size: 18
          },
        },
        bgcolor : 'white',
        ticksuffix: '%',
        tickfont: {
          size: 16
        },
        nticks: 10,
        tickmode: 'auto',
        showticksuffix: 'all',
        xanchor : "right",
        xpad : 10,
      },
    },
    text: lotnames,
    customdata: capacity_array,
    name : '',
    hovertemplate: '<b>%{text}</b>' + '<br>' +
                  '<i>Capacity</i>: %{customdata[0]}/%{customdata[1]} (%{marker.color}%)',
  }];

  var layout = {
    font: {
      family: 'Droid Serif, serif',
      size: 10
    },
    titlefont: {
      size: 16
    },
    margin : {
      autoexpand : false,
      t: 0,
      l: 0,
      r: 0,
      b: 0
    },
    //width : mapWidth,
    //height : mapHeight,
    autosize : true,
    uniformtext : {
      minsize : 10
    },
    mapbox: {
      center: {
        lat : center_lat,
        lon : center_lon + .004
      },
      style: 'outdoors',    //'satellite-streets'
      zoom: 13,
    }
  };

  var config = {
    responsive: true,
    displayModeBar: false
  };

  return {'data': data, 'layout':layout, 'config':config, 'lots':lots};
}
