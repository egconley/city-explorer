'use strict';

require('dotenv').config();

const express = require('express');

// const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3002;

app.get('/cool', (request, response) => {
  response.send('cool data from the /cool route');
})

app.get('/location', (request, response) => {
  const geoData = require('./data/geo.json')
  const city = request.query.data;
  const locationData = new Location(city, geoData);
  response.send(locationData.latitude, locationData.longitude);
  // response.send(city);
})

function Location(city, geoData) {
  this.search_query = city;
  this.formatted_query = geoData.results[0].formatted_address;
  this.latitude = geoData.results[0].geometry.location.lat;
  this.longitude = geoData.results[0].geometry.location.lng;
}

app.use( '/', express.static('app') );

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
})
