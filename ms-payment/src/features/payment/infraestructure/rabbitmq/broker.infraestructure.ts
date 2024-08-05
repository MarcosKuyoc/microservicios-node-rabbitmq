import { BrokerBootstrap } from "../../../../bootstrap/broker.bootstrap";
import { EnvironmentVariables } from "../../../../config/app.config";
import { BrokerRepository, Payment, PAYMENT_GATEWAY, STATUS } from "../../domain";
import { PaymentInfrastructure } from "../mongo-database/payment.infraestructure";
import { SendMessagesService, ReceiveMessageService, UtilsBrokerService } from "./services";
import { PublishMessagesServices } from "./services/publish-messages.service";

export class BrokerInfrastructure implements BrokerRepository {
  constructor(private readonly paymentInfrastructure: PaymentInfrastructure) {}

  async send(message: any): Promise<any> {
    const channel = BrokerBootstrap.Channel;
    const queueName = EnvironmentVariables.QUEUE_ORDER_PAID_EVENT;
    await SendMessagesService.send(channel, queueName, message);
    console.debug("Payment enviado");
  }

  async receive(): Promise<any> {
    const channel = BrokerBootstrap.Channel;
    const queueName = EnvironmentVariables.QUEUE_ORDER_CREATED_EVENT;

    await ReceiveMessageService.accepted(
      channel,
      queueName,
      this.consumerAccept.bind(this)
    );

    await ReceiveMessageService.rejected(
      channel,
      this.consumerReject.bind(this),
      ["delivery.error", "store.error"]
    );
  }

  async consumerAccept(message: any) {
    const content = JSON.parse(message.content.toString()).data;

    // TODO: Recibir el mensaje y crear el nuevo pago con stripe o alguna pasarela de pago - adjuntar a la DB de pagos
    const payment = new Payment(
      content.userId,
      content.productId,
      content.productName,
      content.productCount,
      content.transactionId,
      STATUS.PENDING,
      PAYMENT_GATEWAY.STRIPE
    );

    await this.paymentInfrastructure.insert(payment);
    UtilsBrokerService.confirmMessage(BrokerBootstrap.Channel, message);
    console.debug("Payment accept: ", content);
    this.send(payment);
  }

  async sendError(message: any): Promise<any> {
    const channel = BrokerBootstrap.Channel;
    const exchangeName = EnvironmentVariables.EXCHANGE_ERROR_EVENT;
    await PublishMessagesServices.publish(channel, exchangeName, "payment.error", message);
  }

  async consumerReject(message: any) {
    const content = JSON.parse(message.content.toString());

    await this.paymentInfrastructure.update(content.transactionId, STATUS.CANCELLED);
    const channel = BrokerBootstrap.Channel;
    UtilsBrokerService.confirmMessage(channel, message);
    console.debug("Payment cancelled: ", content);
  }
}