import { BrokerBootstrap } from "../../../../bootstrap/broker.bootstrap";
import { EnvironmentVariables } from "../../../../config/app.config";
import BrokerRepository from "../../domain/broker.repository";
import { STATUS } from "../../domain/order";
import { OrderInfrastructure } from "../mongo-database/order.infraestructure";
import { ReceiveMessageService, UtilsBrokerService } from "./services";

export class BrokerInfrastructure implements BrokerRepository {
  constructor(private readonly orderInfrastructure: OrderInfrastructure) {}

  async send(message: any): Promise<any> {
    const channel = BrokerBootstrap.Channel;
    const queueName = EnvironmentVariables.QUEUE_ORDER_CREATED_EVENT;
    await channel.assertQueue(queueName, { durable: true });
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
  }

  async receive(): Promise<any> {
    const channel = BrokerBootstrap.Channel;
    const exchangeName = EnvironmentVariables.EXCHANGE_ORDER_COMPLETED_EVENT;
    const exchangeType = "fanout";

    await ReceiveMessageService.confirmedOrder(
      channel,
      this.consumerOrderConfirmed.bind(this),
      exchangeName,
      exchangeType
    );

    await ReceiveMessageService.rejected(
      channel,
      this.consumerReject.bind(this),
      "*.error"
    );
  }

  async consumerOrderConfirmed(message: any) {
    const content = JSON.parse(message.content.toString());

    console.log("Order confirmed: ", content);

    await this.orderInfrastructure.update(content.transactionId, STATUS.COMPLETED);

    UtilsBrokerService.confirmMessage(BrokerBootstrap.Channel, message);
  }

  async consumerReject(message: any) {
    const content = JSON.parse(message.content.toString());

    await this.orderInfrastructure.update(content.transactionId, STATUS.CANCELLED);
    UtilsBrokerService.confirmMessage(BrokerBootstrap.Channel, message);
  }
}