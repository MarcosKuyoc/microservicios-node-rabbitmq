import { BrokerApplication } from "../features/order/application/broker.application";
import { BrokerController } from "../features/order/infraestructure/controllers/broker/broker.controller";
import { OrderInfrastructure } from '../features/order/infraestructure/mongo-database/order.infraestructure';
import { BrokerInfrastructure } from "../features/order/infraestructure/rabbitmq/broker.infraestructure";

const orderInfrastructure = new OrderInfrastructure();
const brokerInfraestructure = new BrokerInfrastructure(orderInfrastructure);
const brokerApplication = new BrokerApplication(brokerInfraestructure);

export class BrokerListener {
  readonly brokerController: BrokerController;
  
  constructor() {
    this.brokerController = new BrokerController(brokerApplication);
  }
  async listen() {
    await this.brokerController.listen();
  }
}