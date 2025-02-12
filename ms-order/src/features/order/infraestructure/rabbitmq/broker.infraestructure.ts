import { BrokerBootstrap } from "../../../../bootstrap/broker.bootstrap";
import { EnvironmentVariables } from "../../../../config/app.config";
import { BrokerRepository, STATUS } from "../../domain";
import { OrderInfrastructure } from "../mongo-database/order.infraestructure";
import { ReceiveMessageService, SendMessagesService, UtilsBrokerService } from "./services";

export class BrokerInfrastructure implements BrokerRepository {
  constructor(private readonly orderInfrastructure: OrderInfrastructure) {}

  async send(message: any): Promise<any> {
    const channel = BrokerBootstrap.Channel;
    const queueName = EnvironmentVariables.QUEUE_ORDER_CREATED_EVENT;
    await SendMessagesService.send(channel, queueName, message);
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

    // await ReceiveMessageService.rejected(
    //   channel,
    //   this.consumerReject.bind(this),
    //   "*.error"
    // );
  }

  async consumerOrderConfirmed(message: any) {
    const content = JSON.parse(message.content.toString());

    await this.orderInfrastructure.update(content.transactionId, STATUS.COMPLETED);
    UtilsBrokerService.confirmMessage(BrokerBootstrap.Channel, message);
    console.debug("Order completada: ", content);
  }

  async consumerReject(message: any) {
    const content = JSON.parse(message.content.toString());
    
    await this.orderInfrastructure.update(content.transactionId, STATUS.CANCELLED);
    UtilsBrokerService.confirmMessage(BrokerBootstrap.Channel, message);
    console.debug("Order cancelled: ", content);
  }
}