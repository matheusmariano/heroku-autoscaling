const amqp = require('../services/amqp');
const uuid = require('uuid/v1');

module.exports = {
  calculate: (request, response) => {
    amqp.connect().then(connection => {
      connection.createChannel().then(channel => {
        channel.assertQueue('', {
          exclusive: true,
        }).then(queue => {
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
      });
    });
  },
};
