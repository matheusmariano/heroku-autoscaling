const uuid = require('uuid/v1');
const co = require('co');
const amqp = require('../services/amqp');

module.exports = {
  calculate: (request, response) => {
    const wrapper = co.wrap(function * () {
      const connection = yield amqp.connect();

      const channel = yield connection.createChannel()

      const queue = yield channel.assertQueue('', {
        exclusive: true,
      })

      const correlationId = uuid();

      const serverQueue = 'rpc_queue';

      const queueName = queue.queue;

      const number = request.body.number;

      console.log(` [x] Requesting fib(${number}).`);

      channel.consume(queueName, message => {
        if (message.properties.correlationId === correlationId) {
          const result = message.content.toString();

          console.log(` [.] Got ${result}.`);

          connection.close();

          response.json({
            data: {
              result
            }
          });
        }
      });

      channel.sendToQueue(serverQueue, new Buffer(number.toString()), {
        correlationId,
        replyTo: queueName,
      });
    }, {
      noAck: true,
    });

    wrapper();
  },
};
