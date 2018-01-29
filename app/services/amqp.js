const amqp = require('amqplib');
const config = require('../config/');

module.exports = {
  connect: () => amqp.connect(config.amqp.url),
};
