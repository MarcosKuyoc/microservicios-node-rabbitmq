import amqp from "amqplib";

export class UtilsBrokerService {
  static confirmMessage(channel: amqp.Channel, message: any) {
    channel.ack(message);
  }
}