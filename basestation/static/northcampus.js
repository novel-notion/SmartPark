function loadNorthCampus(){

  Plotly.setPlotConfig({mapboxAccessToken: 'pk.eyJ1IjoiZGpwYXJkbyIsImEiOiJjbDE0YmZlcDUwaHVjM2pvZGprenlqZnMzIn0.au05Z1P0yFZ6FeDhEc-A4A'});
  
  var vw = .01*document.documentElement.clientWidth;
  var vh = .01*(document.documentElement.clientHeight - document.getElementById("header").offsetHeight - document.getElementById("defaultOpen").clientHeight);
  
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if (this.readyState === 4 && this.status === 200){
      capacity_array = JSON.parse(this.response);
      params = getNorthMapParams(capacity_array, vw, vh);
      Plotly.newPlot("northcampus", params.data, params.layout, params.config);
    }
  };
  xhttp.open("GET", "/database");
  xhttp.send();
};

function updateNorthCampus(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if (this.readyState === 4 && this.status === 200){

      var capacity_array = JSON.parse(this.response);
      var capacity_percentages = []
      for (i=0; i<capacity_array.length; i++){
        capacity_percentages[i] = Math.round(capacity_array[i][0]/capacity_array[i][1]*100);
      }; 
      
      var update = {
        'marker.color': [capacity_percentages],
        customdata : [capacity_array]
      }

      Plotly.restyle("northcampus", update, [0]);
    };
  };
  xhttp.open("GET", "/database");
  xhttp.send();
};

setInterval(updateNorthCampus, 1000);

function getNorthMapParams(capacity_array, vw, vh){
  var lots = {'Ketter' 	      : [43.002466, -78.788838],
              'Fargo'         : [43.006405, -78.787122],
              'Governors B'   : [43.002356, -78.792486],
              'Governors C'   : [43.003768, -78.790362],
              'Governors D'   : [43.003863, -78.791993],
              'Governors E'   : [43.003737, -78.794096],
              'Red Jacket'    : [43.008586, -78.787572],
              'Richmond B'    : [43.009935, -78.788002],
              'Richmond A'    : [43.010359, -78.78695],
              'Spaulding'     : [43.010594, -78.783259],
              'Alumni A'      : [43.000716, -78.780223],
              'Alumni B'      : [43.001901, -78.77871],
              'Alumni C'      : [43.001909, -78.779976],
              'Arena'         : [43.000857, -78.779418],
              'Baird A'       : [42.998558, -78.784504],
              'Baird B'       : [42.999374, -78.784461],
              'Jacobs A'      : [42.998511, -78.788302],
              'Jacobs B'      : [42.998401, -78.7871],
              'Jacobs C'      : [42.998574, -78.786113],
              'Lake La Salle' : [43.001328, -78.781049],
              'Slee A' 	      : [42.99848, -78.783517],
              'Slee B' 	      : [42.999374, -78.783474],
              'Special Events': [42.997648, -78.784418],
              'Stadium' 	    : [42.997821, -78.779655],
              'Furnas<br>(Faculty/Staff)' 	      : [43.00245, -78.786328],
              'Governors A<br>(Faculty/Staff)' 	  : [43.00234, -78.790877],
              'Hochstetter A<br>(Faculty/Staff)'  : [42.998809, -78.791585],
              'Jacobs A<br>(Faculty/Staff)' 	    : [42.998511, -78.788302],
              'Cooke A'     	: [42.999437, -78.793216],
              'Cooke B' 	    : [42.998715, -78.793237],
              'Crofts' 	      : [42.994807, -78.797078],
              'Fronczak' 	    : [43.002425, -78.791424],
              'Hochstetter B' : [42.99859, -78.790212],
              'Jarvis A' 	    : [43.003721, -78.788517],
              'Jarvis B' 	    : [43.003972, -78.786929],
              'Park Hall'   	: [42.999657, -78.788688],  };

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
      colorscale: 'Rainbow',
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
        xpad : 3*vw,
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
    height : 98*vh,
    autosize : true,
    uniformtext : {
      minsize : 8
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
    displayModeBar: false,
    //scrollZoom : false
  };

  return {'data': data, 'layout':layout, 'config':config, 'lots':lots};
};
