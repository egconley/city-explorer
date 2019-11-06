
'use strict';

require('dotenv').config();

const express = require('express');

const cors = require('cors');

const app = express();
app.use(cors());

// uppcase convention for variables in .env
const PORT = process.env.PORT || 3002;

app.use('/', express.static('app'));
app.get('/weather', weatherHandler);
app.get('/location', locationHandler);
app.use('*', notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
})

function locationHandler(request, response) {
  // Get some real data from a real API
  let rawData = require('./data/geo.json');
  let location = new Location('seattle', rawData);
  response.status(200).json(location);
}

function weatherHandler(request, response) {
  const weatherData = require('./data/darksky.json');
  const weatherSummaries = [];
  weatherData.daily.data.forEach((day) => {
    weatherSummaries.push(new Weather(day))
  });
  response.status(200).json(weatherSummaries);
}

function Weather(day) {
  this.forecast = day.summary;
  this.time = new Date(day.time * 1000).toString().slice(0, 15);
}

function errorHandler(error, request, response) {
  //status 500 - server mistake
  response.status(500).send(error);
}

function notFoundHandler(request, response) {
  response.status(404).send('Not Found');
}

function Location(city, /*geoData*/ locationData) {
  this.search_query = city;
  this.formatted_query = locationData.results[0].formatted_address;
  this.latitude = locationData.results[0].geometry.location.lat;
  this.longitude = locationData.results[0].geometry.location.lng;
}

