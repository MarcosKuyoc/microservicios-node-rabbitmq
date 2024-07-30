import { BrokerApplication } from "../features/store/application/broker.application";
import { BrokerController } from "../features/store/infraestructure/controller/broker.controller";
import { BrokerInfrastructure } from "../features/store/infraestructure/rabbitmq/broker.infraestructure";

const brokerInfraestructure = new BrokerInfrastructure();
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