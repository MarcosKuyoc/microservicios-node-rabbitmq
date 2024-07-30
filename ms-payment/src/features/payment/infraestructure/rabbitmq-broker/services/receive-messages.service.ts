import amqp from "amqplib";
import { EnvironmentVariables } from "../../../../../config/app.config";

export class ReceiveMessageService {
  static async accepted(
    channel: amqp.Channel,
    queueName: string,
    cb: (message: any) => void
  ) {
    await channel.assertQueue(queueName, { durable: true });
    channel.consume(queueName, (message: any) => cb(message), {
      noAck: false,
    });
  }

  static async rejected(
    channel: amqp.Channel,
    cb: (message: any) => void,
    routingKeys: string[]
  ) {
    await channel.assertExchange(
      EnvironmentVariables.EXCHANGE_ERROR_EVENT,
      "topic",
      { durable: true }
    );

    const assertQueue = await channel.assertQueue("", { exclusive: true });
    routingKeys.forEach((routingKey) => {
      channel.bindQueue(
        assertQueue.queue,
        EnvironmentVariables.EXCHANGE_ERROR_EVENT,
        routingKey
      );
    });

    channel.consume(assertQueue.queue, (message: any) => cb(message), {
      noAck: false,
    });
  }
}