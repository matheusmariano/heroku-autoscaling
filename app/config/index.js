module.exports = {
  app: {
    port: process.env.PORT || 3000,
  },
  amqp: {
    url: process.env.AMQP_URL || 'amqp://localhost',
  },
};
