import amqp from "amqplib";
export class PublishMessagesServices {
  static async publish(channel: amqp.Channel, exchangeName: string, routingKey: string, message: any) {
    await channel.assertExchange(exchangeName, "topic", { durable: true });
    channel.publish(
      exchangeName,
      routingKey,
      Buffer.from(JSON.stringify(message))
    );
  }
}