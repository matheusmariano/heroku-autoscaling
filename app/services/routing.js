const express = require('express');
const config = require('../config/');
const router = require('../routes');

const app = express();

app.use(router);

const port = config.app.port;

app.listen(port, () => {
  console.log(`Listening to port ${port}.`);
});
