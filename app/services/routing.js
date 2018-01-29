const express = require('express');
const bodyParser = require('body-parser');
const config = require('../config/');
const router = require('../routes');

const app = express();

app.use(bodyParser.json());
app.use(router);

const port = config.app.port;

app.listen(port, () => {
  console.log(`Listening to port ${port}.`);
});
