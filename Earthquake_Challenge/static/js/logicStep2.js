//Add console.log to check if code is working
console.log("working");

// We create the tile layer that will be the default background of our map.
let street = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// Create the dark view tile layer that will be an option for our map
let satelliteStreet = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps
let baseMaps = {
    "Satellite Streets": satelliteStreet,
    "Streets": street
};

// Create the map object with the center, zoom level and default layer
let map = L.map('mapid',{
    center: [39.5, -98.5],
    zoom: 3,
    layers:[street]
});

//Pass our map layer into our layers control and add the layers control to the map
L.control.layers(baseMaps).addTo(map); 

// Accessing the airport GeoJSON URL

let earthquakes = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Create a style for the lines
// let myStyle ={ 
//     color: 'blue',
//     fillColor: '#feffc3',
//     weight:1,
//     fillOpacity: 0.5,

// }

// Grabing our GeoJSON data
d3.json(earthquakes).then(function(data){
// This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into a function
// to calculate the radius.
    function styleInfo(feature){
        return{
            opacity: 1,
            fillOpacity: 1,
            fillColor: "#ffae42",
            color: "#000000",
            radius: getRadius(feature.properties.mag),
            stroke: true,
            weight: 0.5
        };
    }
// This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
    function getRadius(magnitude) {
        if (magnitude === 0) {
        return 1;
    }
    return magnitude * 4;
  }
     
     // Creating a GeoJSON layer with the retrieved data.
    L.geoJSON(data,{
        pointToLayer: function(feature, latlng){
            console.log(data);
            return L.circleMarker(latlng);
        },
     // We set the style for each circleMarker using our styleInfo function.
     style: styleInfo,        
    }).addTo(map);
});















// //Create the map object with a center and zoom level

// let map = L.map('mapid').setView([30, 30], 20);

// Then we add our 'graymap' tile layer to the map

// streets.addTo(map);

// Accessing the airport GeoJSON URL

// let airportData = "https://raw.githubusercontent.com/katiarp/Mapping_Earhtquakes/Mapping_GeoJSON_Points/majorAirports.json";

// // Grabing our GeoJSON data
// d3.json(airportData).then(function(data){
//     console.log(data); 
//     // Creating a GeoJSON layer with the retrieved data.
//     L.geoJSON(data, {
//         onEachFeature: function(feature, layer) {
//             console.log(layer);
//             layer.bindPopup("<h2>" + "Airport code: " + feature.properties.faa + "</h2><hr><h3>" + "Airport name: " + feature.properties.name + "</h3>");
//         }}).addTo(map);
// });
















// // Add GeoJSON data.
// let sanFranAirport =
// {"type":"FeatureCollection","features":[{
//     "type":"Feature",
//     "properties":{
//         "id":"3469",
//         "name":"San Francisco International Airport",
//         "city":"San Francisco",
//         "country":"United States",
//         "faa":"SFO",
//         "icao":"KSFO",
//         "alt":"13",
//         "tz-offset":"-8",
//         "dst":"A",
//         "tz":"America/Los_Angeles"},
//         "geometry":{
//             "type":"Point",
//             "coordinates":[-122.375,37.61899948120117]}}
// ]};

// //Grabbing our GeoJSON data
// L.geoJSON(sanFranAirport, {
//     //We turn each feature into a marker on the map
//     pointToLayer: function(feature, latlng){
//         console.log(feature);
//         return L.marker(latlng)
//         .bindPopup("<h2>" + feature.properties.name + "</h2><hr><h3>" + feature.properties.city + ", " + feature.properties.country + "</h3>");
//     }
// }).addTo(map);

// //Grabbing our GeoJSON data and pop up marker using onEachFeature
// L.geoJSON(sanFranAirport, {
//     //We turn each feature into a marker on the map
//     onEachFeature: function(feature, layer) {
//         console.log("layer is: "+layer);
//         layer.bindPopup("<h2>" + "Airport code: " + feature.properties.faa + "</h2><hr><h3>" + "Airport name: " + feature.properties.name + "</h3>");
//     }
// }).addTo(map);
