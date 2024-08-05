import amqp from "amqplib";

export class SendMessagesService {
  static async send(channel: amqp.Channel, queueName: string, message: any) {
    await channel.assertQueue(queueName, { durable: true });
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
  }
}