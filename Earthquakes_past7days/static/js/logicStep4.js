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

// Create the earthquake layer for our map.
let earthquakes = new L.layerGroup();

// Define an object that contains the overlays.
// This overlay will be visible all the time
let overlays = {
    Earthquakes: earthquakes
};

// Create the map object with the center, zoom level and default layer
let map = L.map('mapid',{
    center: [39.5, -98.5],
    zoom: 3,
    layers:[street]
});

//Pass our map layer into our layers control and add the layers control to the map
L.control.layers(baseMaps, overlays).addTo(map); 

// Accessing the airport GeoJSON URL

let earthquakes7days = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


// Grabing our GeoJSON data
d3.json(earthquakes7days).then(function(data){
// This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into a function
// to calculate the radius.
    function styleInfo(feature){
        return{
            opacity: 1,
            fillOpacity: 1,
            fillColor: getColor(feature.properties.mag),
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

// This function determines the color of the circle based on the magnitude of the earthquake.
    function getColor(magnitude){
        if (magnitude > 5) {
            return "#ea2c2c";
        }
        if (magnitude > 4) {
            return "#ea822c";
        }
        if (magnitude > 3) {
            return "#ee9c00";
        }
        if (magnitude > 2) {
            return "#eecc00";
        }
        if (magnitude > 1) {
            return "#d4ee00";
        }
        return "#98ee00";
     }
     
     // Creating a GeoJSON layer with the retrieved data.
    L.geoJSON(data,{
        pointToLayer: function(feature, latlng){
            console.log(data);
            return L.circleMarker(latlng);
        },
     // We set the style for each circleMarker using our styleInfo function.
     style: styleInfo,  
     //Create a popup for each circle marker to display the magnitude and location of the earthquake  
     onEachFeature: function(feature, layer) {
        layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: "+ feature.properties.place);
     }
    }).addTo(earthquakes);

    // Add the earthquake layer to map
    earthquakes.addTo(map);
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
