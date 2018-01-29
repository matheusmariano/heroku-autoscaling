module.exports = {
  app: {
    port: process.env.PORT || 3000,
  },
  amqp: {
    url: process.env.AMQP_URL || 'amqp://localhost',
  },
  heroku: {
    token: process.env.HEROKU_TOKEN,
    app: {
      id: process.env.HEROKU_APP_ID,
    },
  },
};
