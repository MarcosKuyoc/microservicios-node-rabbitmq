import { BrokerApplication } from "../features/store/application/broker.application";
import { BrokerController } from "../features/store/infraestructure/controller/broker.controller";
import { StoreInfrastructure } from "../features/store/infraestructure/mongo-database/store.infraestructure";
import { BrokerInfrastructure } from "../features/store/infraestructure/rabbitmq/broker.infraestructure";

const storeInfrastructure = new StoreInfrastructure();
const brokerInfraestructure = new BrokerInfrastructure(storeInfrastructure);
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