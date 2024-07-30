import { BrokerRepository } from "../domain/broker.repository";


export class BrokerApplication {
  readonly repositoryBroker: BrokerRepository;

  constructor(
    repositoryBroker: BrokerRepository
  ) {
    this.repositoryBroker = repositoryBroker;
  }

  async receive() {
    await this.repositoryBroker.receive();
  }
}