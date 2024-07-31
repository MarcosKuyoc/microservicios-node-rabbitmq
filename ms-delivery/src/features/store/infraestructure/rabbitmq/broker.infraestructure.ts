import { BrokerBootstrap } from "../../../../bootstrap/broker.bootstrap";
import { EnvironmentVariables } from "../../../../config/app.config";
import { BrokerRepository, Delivery, DELIVERY_STATUS, PAYMENT_GATEWAY, STATUS } from "../../domain";
import { ReceiveMessageService, UtilsBrokerService } from "./services";

export class BrokerInfrastructure implements BrokerRepository {
  constructor() {}

  async send(message: any): Promise<any> {
    const channel = BrokerBootstrap.Channel;
    const exchangeName = EnvironmentVariables.EXCHANGE_ORDER_COMPLETED_EVENT;
    
    await channel.assertExchange(exchangeName, "fanout", { durable: true });
    channel.publish(exchangeName, "", Buffer.from(JSON.stringify(message)));
  }

  async sendError(message: any): Promise<any> {
    const channel = BrokerBootstrap.Channel;
    const exchangeName = EnvironmentVariables.EXCHANGE_ERROR_EVENT;
    await channel.assertExchange(exchangeName, "topic", { durable: true });
    channel.publish(
      exchangeName,
      "delivery.error",
      Buffer.from(JSON.stringify(message))
    );
  }

  async receive(): Promise<any> {
    const channel = BrokerBootstrap.Channel;
    const queueName = EnvironmentVariables.QUEUE_ORDER_STORED_EVENT;

    await ReceiveMessageService.accepted(
      channel,
      queueName,
      this.consumerAccept.bind(this)
    );
  }

  async consumerAccept(message: any) {
    const content = JSON.parse(message.content.toString());

    // TODO: Recibir el mensaje y seleccionar la tienda
    const delivery = new Delivery(
      content.userId,
      content.productId,
      content.productName,
      content.productCount,
      content.transactionId,
      STATUS.PENDING,
      PAYMENT_GATEWAY.STRIPE,
      'Tienda #1',
      DELIVERY_STATUS.ENTREGADO
    );

    UtilsBrokerService.confirmMessage(BrokerBootstrap.Channel, message);
    this.sendError(delivery);
  }
}