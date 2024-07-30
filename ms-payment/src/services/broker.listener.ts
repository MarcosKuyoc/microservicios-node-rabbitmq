import { BrokerApplication } from "../features/payment/application/broker.application";
import BrokerController from "../features/payment/infraestructure/controller/broker.controller";
import { PaymentInfrastructure } from "../features/payment/infraestructure/mongo-database/payment.infraestructure";
import BrokerInfrastructure from "../features/payment/infraestructure/rabbitmq-queue/broker.infraestructure";

const paymentInfrastructure = new PaymentInfrastructure();
const brokerInfraestructure = new BrokerInfrastructure(paymentInfrastructure);
const brokerApplication = new BrokerApplication(brokerInfraestructure);

export class BrokerListener {
  private readonly brokerController: BrokerController;
  
  constructor() {
    this.brokerController = new BrokerController(brokerApplication);
  }
  async listen() {
    await this.brokerController.listen();
  }
}