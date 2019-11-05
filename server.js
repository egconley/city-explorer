'use strict';

require('dotenv').config();

const express = require('express');

// const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/cool', (request, response) => {
  response.send('cool data from the /cool route');
})

// app.use( express.static('./starter-code') );

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
})
