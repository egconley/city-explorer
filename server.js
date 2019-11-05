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
  const city = request.query;
  response.send(city);
})

app.use( '/', express.static('app') );

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
})
