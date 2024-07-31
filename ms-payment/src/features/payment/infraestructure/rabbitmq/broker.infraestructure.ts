import { BrokerBootstrap } from "../../../../bootstrap/broker.bootstrap";
import { EnvironmentVariables } from "../../../../config/app.config";
import { BrokerRepository, Payment, PAYMENT_GATEWAY, STATUS } from "../../domain";
import { PaymentInfrastructure } from "../mongo-database/payment.infraestructure";
import { ReceiveMessageService, UtilsBrokerService } from "./services";

export class BrokerInfrastructure implements BrokerRepository {
  constructor(private readonly paymentInfrastructure: PaymentInfrastructure) {}

  async send(message: any): Promise<any> {
    const channel = BrokerBootstrap.Channel;
    const queueName = EnvironmentVariables.QUEUE_ORDER_PAID_EVENT;
    await channel.assertQueue(queueName, { durable: true });
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
  }

  async sendError(message: any): Promise<any> {
    const channel = BrokerBootstrap.Channel;
    const exchangeName = EnvironmentVariables.EXCHANGE_ERROR_EVENT;
    await channel.assertExchange(exchangeName, "topic", { durable: true });
    channel.publish(
      exchangeName,
      "payment.error",
      Buffer.from(JSON.stringify(message))
    );
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
    console.debug("Payment accept: ", content);

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
    this.send(payment);
    console.debug("Payment enviado");
  }

  async consumerReject(message: any) {
    const content = JSON.parse(message.content.toString());

    await this.paymentInfrastructure.update(content.transactionId, STATUS.CANCELLED);
    UtilsBrokerService.confirmMessage(BrokerBootstrap.Channel, message);
    console.debug("Payment cancelled: ", content);
  }
}