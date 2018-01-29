require('../bootstrap');
const amqp = require('../services/amqp');

amqp.connect().then(connection => {
  connection.createChannel().then(channel => {
    const serverQueue = 'rpc_queue';

    channel.assertQueue(serverQueue, {
      durable: false,
    });

    console.log(' [x] Awaiting requests.');

    channel.consume(serverQueue, message => {
      const clientQueue = message.properties.replyTo;
      const number = parseInt(message.content.toString());

      console.log(` [.] fib(${number})`);

      const result = fib(number);

      channel.sendToQueue(clientQueue, new Buffer(result.toString()), {
        correlationId: message.properties.correlationId,
      });

      channel.ack(message);
    });
  });
});

function fib(number) {
  if (number == 0 || number == 1) {
    return number;
  } else {
    return fib(number - 1) + fib(number - 2);
  }
}
