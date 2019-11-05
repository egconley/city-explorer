'use strict';

require('dotenv').config();

const express = require('express');

// const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3002;

app.get('/location', (request, response) => {
  // request.get('target form entry and see if it\'s teh appropriate data for this function');
  response.send('blah blah');
})

app.use( '/', express.static('app') );

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
})
