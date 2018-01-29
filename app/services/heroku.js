const HerokuClient = require('heroku-client');
const config = require('../config/');

const appId = config.heroku.app.id;

const heroku = new HerokuClient({
  token: config.heroku.token,
});

const createDyno = () =>
  heroku.post(`/apps/${appId}/dynos`, {
    body: {
      command: 'node app/workers/fib.js',
      time_to_live: 60,
      type: 'fib',
    }
  });

const stopDyno = (dynoId) =>
  heroku.post(`/apps/${appId}/dynos/${dynoId}/actions/stop`);

module.exports = {
  heroku,
  createDyno,
  stopDyno,
};
