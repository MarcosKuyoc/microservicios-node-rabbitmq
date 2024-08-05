import { BrokerBootstrap } from "../../../../bootstrap/broker.bootstrap";
import { EnvironmentVariables } from "../../../../config/app.config";
import { BrokerRepository, Store, PAYMENT_GATEWAY, STATUS } from "../../domain";
import { StoreInfrastructure } from "../mongo-database/store.infraestructure";
import { ReceiveMessageService, SendMessagesService, UtilsBrokerService } from "./services";

export class BrokerInfrastructure implements BrokerRepository {
  constructor(private readonly storeInfrastructure: StoreInfrastructure) {}

  async send(message: any): Promise<any> {
    const channel = BrokerBootstrap.Channel;
    const queueName = EnvironmentVariables.QUEUE_ORDER_STORED_EVENT;
    await SendMessagesService.send(channel, queueName, message);
    console.debug("Order enviada");
  }

  async sendError(message: any): Promise<any> {
    const channel = BrokerBootstrap.Channel;
    const exchangeName = EnvironmentVariables.EXCHANGE_ERROR_EVENT;
    await channel.assertExchange(exchangeName, "topic", { durable: true });
    channel.publish(
      exchangeName,
      "store.error",
      Buffer.from(JSON.stringify(message))
    );
  }

  async receive(): Promise<any> {
    const channel = BrokerBootstrap.Channel;
    const queueName = EnvironmentVariables.QUEUE_ORDER_PAID_EVENT;

    await ReceiveMessageService.accepted(
      channel,
      queueName,
      this.consumerAccept.bind(this)
    );

    // await ReceiveMessageService.rejected(
    //   channel,
    //   this.consumerReject.bind(this),
    //   "delivery.error"
    // );
  }

  async consumerAccept(message: any) {
    const content = JSON.parse(message.content.toString());
    
    // TODO: Recibir el mensaje y seleccionar la tienda
    const store = new Store(
      content.userId,
      content.productId,
      content.productName,
      content.productCount,
      content.transactionId,
      STATUS.PENDING,
      PAYMENT_GATEWAY.STRIPE,
      'Tienda #1'
    );
    
    await this.storeInfrastructure.insert(store);
    UtilsBrokerService.confirmMessage(BrokerBootstrap.Channel, message);
    console.debug("Store aceptada y confirmada: ", content);
    this.send(store);
  }

  async consumerReject(message: any) {
    const content = JSON.parse(message.content.toString());

    await this.storeInfrastructure.update(content.transactionId, STATUS.CANCELLED);
    UtilsBrokerService.confirmMessage(BrokerBootstrap.Channel, message);
    console.debug("Store cancelled: ", content);
  }
}